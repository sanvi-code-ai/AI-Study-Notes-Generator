// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const { GoogleGenAI } = require("@google/genai");
// console.log("Upload API Key:", process.env.GEMINI_API_KEY);
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const uploadPDF = async (req, res) => {
//   try {
//     // Check if a file was uploaded
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No PDF uploaded",
//       });
//     }

//     // Read the uploaded PDF
//     const dataBuffer = fs.readFileSync(req.file.path);

//     // Extract text from the PDF
//     const data = await pdfParse(dataBuffer);
//     const pdfText = data.text;

//     // If no text is found
//     if (!pdfText.trim()) {
//       fs.unlinkSync(req.file.path);

//       return res.status(400).json({
//         message: "No readable text found in the PDF.",
//       });
//     }

//     // Prompt for Gemini
//     const prompt = `
// Convert the following PDF content into clean Markdown study notes.

// Rules:
// - Use # and ## headings.
// - Use "-" for bullet points (NOT "*").
// - Do NOT use LaTeX like $V$, $CO_2$, etc.
// - Write CO2, H2O, O2 as plain text.
// - Use **bold** where needed.
// - Keep the notes concise and easy to understand.
// - Do not wrap the response in markdown code fences.

// PDF Content:

// ${pdfText}
// `;

//     // Generate notes using Gemini
//     const response = await ai.models.generateContent({
//       model: "gemini-flash-latest",
//       contents: prompt,
//     });

//     // Delete uploaded file after processing
//     fs.unlinkSync(req.file.path);

//     // Send generated notes
//     res.status(200).json({
//       studyNotes: response.text,
//     });

//   } catch (error) {
//     console.error("Upload Error:", error);

//     // Delete uploaded file if it exists
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }

//     res.status(500).json({
//       message: "Failed to generate study notes from PDF",
//     });
//   }
// };

// module.exports = {
//   uploadPDF,
// };


const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (prompt, retries = 3) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      });

      return response;
    } catch (error) {
      const status = error?.status || error?.error?.code;

      console.error(
        `Gemini attempt ${attempt + 1} failed:`,
        error?.message || error
      );

      if (status === 503 && attempt < retries) {
        const delay = 2000 * Math.pow(2, attempt);

        console.log(`Retrying Gemini in ${delay / 1000} seconds...`);

        await sleep(delay);
      } else {
        throw error;
      }
    }
  }
};

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(dataBuffer);
    const pdfText = data.text;

    if (!pdfText.trim()) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "No readable text found in the PDF.",
      });
    }

    const prompt = `
Convert the following PDF content into clean Markdown study notes.

Rules:
- Use # and ## headings.
- Use "-" for bullet points (NOT "*").
- Do NOT use LaTeX like $V$, $CO_2$, etc.
- Write CO2, H2O, O2 as plain text.
- Use **bold** where needed.
- Keep the notes concise and easy to understand.
- Do not wrap the response in markdown code fences.

PDF Content:

${pdfText}
`;

    const response = await generateWithRetry(prompt);

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      studyNotes: response.text,
    });

  } catch (error) {
    console.error("Upload Error:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Failed to generate study notes from PDF",
    });
  }
};

module.exports = {
  uploadPDF,
};