const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/solve", async (req, res) => {
  const conversation = req.body.conversation || [];
  const methodCount = parseInt(req.body.methodCount || "1");

  const messages = [
    { role: "system", content: "You are a helpful math tutor. Show step-by-step solutions." },
    ...conversation
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.2 + 0.1 * n,
	  n: methodCount,
    });

    const answers = response.choices.map(choice => choice.message.content);
    res.json({ answers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI error" });
  }
});

app.listen(8080, () => {
  console.log("listen in 8080");
});
