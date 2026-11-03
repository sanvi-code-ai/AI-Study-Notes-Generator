
require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function testGroq() {
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: "Explain Ohm's Law in simple language in 5 bullet points."
                }
            ],
            max_completion_tokens: 300
        });

        console.log("\nGroq API is working!");
        console.log(response.choices[0].message.content);

    } catch (error) {
        console.log("Groq API test failed:");
        console.log(error.message);
    }
}

testGroq();
