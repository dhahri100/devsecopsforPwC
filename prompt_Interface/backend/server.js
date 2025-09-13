const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let chatLogs = [];

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt invalide ou manquant." });
  }

  try {
    const response = await axios.post(
      "http://localhost:5678/webhook-test/fe53aa6d-b6af-4060-877c-ef082e1532c7", // Confirm this matches your n8n webhook path
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization header removed
        },
      }
    );

    const content =
      response.data.output ||
      response.data.response ||
      "⚠️ Réponse vide.";

    const logEntry = {
      id: chatLogs.length + 1,
      prompt,
      response: content,
      timestamp: new Date().toISOString(),
    };
    chatLogs.push(logEntry);

    res.json({ output: content, prompt });
  } catch (error) {
    console.error("Erreur N8N:", error.response?.data || error.message);
    res.status(500).json({ error: "Erreur lors de l'appel à N8N" });
  }
});

app.get("/api/logs", (req, res) => {
  res.json(chatLogs);
});

app.listen(3001, () => {
  console.log("✅ Backend démarré sur http://localhost:3001");
});
