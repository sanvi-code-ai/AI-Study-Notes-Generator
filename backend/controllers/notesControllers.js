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
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const prompt = `
Convert the following text into 15 multiple choice questions.

Rules:
- Create exactly 15 questions.
- 4 options labelled as A, B, C, and D.
- Give answer after every question.
- Level of the question should be according to the information provided in the text.
- Do not wrap the output in code blocks.

Text:
${text}
`;

    // Updated model to gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    res.status(200).json({
      quiz: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({
      message: "Failed to generate quiz",
    });
  }
};

module.exports = {
  generateStudyNotes,
  generateQuiz,
};


