
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate content with retry handling
const generateWithRetry = async (prompt) => {
  const maxAttempts = 4;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      if (!response.text) {
        throw new Error("Gemini returned an empty response");
      }

      return response;

    } catch (error) {
      const status = Number(error.status ?? error.code);

      console.error(`Gemini attempt ${attempt} failed:`, {
        message: error.message,
        status,
      });

      const retryable =
        status === 429 ||
        status >= 500 ||
        /UNAVAILABLE|RESOURCE_EXHAUSTED/i.test(error.message || "");

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      const delay = Math.min(
        1500 * Math.pow(2, attempt - 1),
        6000
      );

      console.log(`Retrying Gemini in ${delay / 1000} seconds...`);

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }
  }
};

// Safely parse JSON returned by Gemini
const parseGeminiJSON = (responseText) => {
  const cleaned = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  return JSON.parse(cleaned);
};

// Handle API errors
const handleError = (res, error, feature) => {
  console.error(`${feature} Error:`, error.message);

  const status = Number(error.status ?? error.code);

  if (status === 429) {
    return res.status(429).json({
      message: "AI request limit reached. Please try again later.",
    });
  }

  if (status === 503 || status >= 500) {
    return res.status(503).json({
      message: "AI service is temporarily unavailable. Please try again shortly.",
    });
  }

  return res.status(500).json({
    message: `Failed to generate ${feature.toLowerCase()}. Please try again.`,
  });
};

// Generate Study Notes
const generateStudyNotes = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        message: "Valid text is required.",
      });
    }

    const prompt = `
You are an expert academic tutor. Convert the following text into clear, structured Markdown study notes.

Formatting rules:
1. Start with one descriptive H1 title.
2. Add a 2-3 sentence overview using a blockquote.
3. Organize concepts using H2 headings.
4. Explain key terms using bold text.
5. Use "-" for bullet points.
6. Highlight important terms, formulas and names in bold.
7. Write formulas in plain text, not LaTeX.
8. Do not omit important information.
9. End with a "## Key Takeaways" section.
10. Do not use Markdown code fences.

Text:
${text}
`;

    const response = await generateWithRetry(prompt);

    return res.status(200).json({
      studyNotes: response.text,
    });

  } catch (error) {
    return handleError(res, error, "Study Notes");
  }
};

// Generate Quiz
const generateQuiz = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || typeof notes !== "string" || !notes.trim()) {
      return res.status(400).json({
        message: "Valid study notes are required.",
      });
    }

    const prompt = `
Generate exactly 10 multiple-choice questions from the following study notes.

Return ONLY a valid JSON array.

Format:
[
  {
    "question": "Question here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Correct Option"
  }
]

Rules:
- Exactly 10 questions.
- Exactly 4 options per question.
- Only one correct answer.
- No explanations.
- No Markdown or code fences.
- Return ONLY JSON.

Study Notes:
${notes}
`;

    const response = await generateWithRetry(prompt);

    const quiz = parseGeminiJSON(response.text);

    if (
      !Array.isArray(quiz) ||
      quiz.length !== 10 ||
      quiz.some(q =>
        !q.question ||
        !Array.isArray(q.options) ||
        q.options.length !== 4 ||
        !q.options.includes(q.answer)
      )
    ) {
      throw new Error("Gemini returned an invalid quiz format.");
    }

    return res.status(200).json({
      quiz,
    });

  } catch (error) {
    return handleError(res, error, "Quiz");
  }
};

// Generate Personalized Study Plan
const generateStudyPlan = async (req, res) => {
  try {
    const {
      score,
      totalQuestions,
      incorrectQuestions,
    } = req.body;

    if (
      score === undefined ||
      !Number.isFinite(Number(score)) ||
      !Number.isFinite(Number(totalQuestions)) ||
      Number(totalQuestions) <= 0 ||
      Number(score) < 0 ||
      Number(score) > Number(totalQuestions) ||
      !Array.isArray(incorrectQuestions)
    ) {
      return res.status(400).json({
        message: "Valid quiz performance data is required.",
      });
    }

    const percentage = Math.round(
      (Number(score) / Number(totalQuestions)) * 100
    );

    const incorrectList = incorrectQuestions
      .map((q, index) => `${index + 1}. ${q}`)
      .join("\n");

    const prompt = `
You are an expert academic tutor.

Analyze the student's quiz performance and create a personalized 5-day study plan.

Quiz Performance:
- Score: ${score}/${totalQuestions}
- Percentage: ${percentage}%

Incorrect Questions:
${incorrectList || "No incorrect questions."}

Create a practical study plan based on the student's weak areas.

Return ONLY valid JSON in this format:

{
  "performance": "Short assessment",
  "weakAreas": [
    "Weak topic 1",
    "Weak topic 2"
  ],
  "studyPlan": [
    {
      "day": "Day 1",
      "focus": "Topic to study",
      "tasks": [
        "Task 1",
        "Task 2"
      ]
    }
  ],
  "recommendation": "Short personalized recommendation"
}

Rules:
- Create a plan for 5 days.
- Focus on concepts related to incorrect questions.
- Keep tasks realistic.
- Do not invent unrelated information.
- Return ONLY JSON.
`;

    const response = await generateWithRetry(prompt);

    const studyPlan = parseGeminiJSON(response.text);

    if (
      !studyPlan.performance ||
      !Array.isArray(studyPlan.weakAreas) ||
      !Array.isArray(studyPlan.studyPlan) ||
      studyPlan.studyPlan.length !== 5 ||
      !studyPlan.recommendation
    ) {
      throw new Error("Gemini returned an invalid study plan format.");
    }

    return res.status(200).json({
      studyPlan,
    });

  } catch (error) {
    return handleError(res, error, "Study Plan");
  }
};

module.exports = {
  generateStudyNotes,
  generateQuiz,
  generateStudyPlan,
};
