const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/solve", async (req, res) => {
  const conversation = req.body.conversation || [];

  const messages = [
    { role: "system", content: "You are a helpful math tutor. Show step-by-step solutions." },
    ...conversation
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.3,
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI error" });
  }
});

app.listen(8080, () => {
  console.log("listen in 8080");
});
