const express = require("express");
const AWS = require("aws-sdk");

const router = express.Router();

AWS.config.update({
  region: "ca-central-1", // Canada Central
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const lexruntime = new AWS.LexRuntimeV2();

router.post("/", async (req, res) => {
  const { message, userId } = req.body;

  const params = {
    botAliasId: process.env.LEX_BOT_ALIAS_ID,
    botId: process.env.LEX_BOT_ID,
    localeId: "en_US",
    sessionId: userId || "default-session",
    text: message,
  };

  try {
    const response = await lexruntime.recognizeText(params).promise();
    res.json(response);
  } catch (err) {
    console.error("Lex error:", err);
    res.status(500).json({ error: "Failed to connect to Lex" });
  }
});

module.exports = router;
