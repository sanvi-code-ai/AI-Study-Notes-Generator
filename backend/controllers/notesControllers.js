const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateStudyNotes = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

//     
    const prompt = `
You are an expert academic tutor. Convert the following text into clean, highly readable, structured Markdown study notes.

Format and Structure Rules:
1. Title: Start with a single "# " main header summarizing the topic.
2. Overview: Provide a 2-3 sentence high-level summary at the top using a blockquote (> ).
3. Core Concepts: Use "## " subheadings to divide the material into distinct logical sections.
4. Key Terms & Definitions: Use bold text (**Term**) followed by clear explanations.
5. Formatting Rules:
   - Use "-" for bullet points (NOT "*").
   - Highlight vital key terms, formulas, or names using **bold text**.
   - Do NOT use LaTeX formulas or symbols like $V$, $CO_2$, etc. Write CO2, H2O, O2, speed = distance / time directly as plain text.
   - End with a "## Key Takeaways" summary section.
   - Do not wrap the response in markdown code fences.

Text:
${text}
`;

    // Updated model to gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    res.status(200).json({
      studyNotes: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({
      message: "Failed to generate study notes",
    });
  }
};

const generateQuiz = async (req, res) => {
  try {
    const { notes } = req.body;
    console.log("Notes received:", notes);

    if (!notes) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const prompt = `
Generate exactly 10 multiple-choice questions from the following study notes.

Return ONLY a valid JSON array.

Each question should be in this format:

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
- Generate exactly 10 questions.
- Each question must have exactly 4 options.
- Only one correct answer.
- Do NOT return explanations.
- Do NOT use markdown.
- Do NOT use code blocks.
- Return ONLY the JSON array.

Study Notes:
${notes}
`;

    // Updated model to gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const quiz = JSON.parse(response.text);
    res.status(200).json({quiz,
});

  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({
      message: "Failed to generate quiz",
    });
  }
};

const generateStudyPlan = async (req, res) => {
  try {
    const { score, totalQuestions, incorrectQuestions } = req.body;

    if (
      score === undefined ||
      !totalQuestions ||
      !incorrectQuestions
    ) {
      return res.status(400).json({
        message: "Quiz performance data is required",
      });
    }

    const percentage = Math.round(
      (score / totalQuestions) * 100
    );

    const prompt = `
You are an expert academic tutor.

Analyze the student's quiz performance and create a personalized study plan.

Quiz Performance:
- Score: ${score}/${totalQuestions}
- Percentage: ${percentage}%

Incorrect Questions:
${incorrectQuestions.map((q, index) => `${index + 1}. ${q}`).join("\n")}

Create a practical study plan based on the student's weak areas.

Return ONLY valid JSON in this format:

{
  "performance": "Short assessment of the student's performance",
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
- Focus primarily on concepts related to incorrect questions.
- Keep tasks realistic for a student.
- Do not invent information unrelated to the quiz.
- Return ONLY JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const studyPlan = JSON.parse(response.text);

    res.status(200).json({
      studyPlan,
    });

  } catch (error) {
    console.error("Study Plan Error:", error.message);

    res.status(500).json({
      message: "Failed to generate study plan",
    });
  }
};

module.exports = {
  generateStudyNotes,
  generateQuiz,
  generateStudyPlan,
};


