// moderation.js
import OpenAI from "openai";

// 1. Init OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 3. Local quick gibberish check
function isGibberish(text) {
  if (!text) return true;

  const words = text.trim().split(/\s+/);
  if (words.length < 3) return true; // too short

  const nonWordRatio = words.filter((w) => !/^[a-zA-Z]+$/.test(w)).length / words.length;
  if (nonWordRatio > 0.6) return true;

  if (/(.)\1{4,}/.test(text)) return true;

  const symbolRatio = (text.match(/[^a-zA-Z0-9\s]/g) || []).length / text.length;
  if (symbolRatio > 0.5) return true;

  return false;
}

// 4. Main moderation function
export async function moderateContent(title, content) {
  const combined = `${title}\n\n${content}`;

  // Step 1: Local gibberish detection
  if (isGibberish(combined)) {
    return {
      category: "GIBBERISH",
      reason: "Text appears to be gibberish or random characters.",
      blocked: true,
    };
  }

  // Step 2: Use OpenAI Moderation API
  const modResponse = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: combined,
  });

  const results = modResponse.results[0];

  // Map OpenAI flags to your categories
  let category = "CLEAN";

  if (results.categories.hate || results.categories["hate/threatening"]) {
    category = "HATE_SPEECH";
  } else if (results.categories["harassment/threatening"] || results.categories.harassment) {
    category = "PERSONAL_ATTACK";
  } else if (
    results.categories.sexual ||
    results.categories.violence ||
    results.categories["self-harm"] ||
    results.categories["sexual/minors"] ||
    results.categories["violence/graphic"]
  ) {
    category = "OTHER_INAPPROPRIATE";
  }

  const blocked = category !== "CLEAN";

  return {
    category,
    reason: blocked ? `Content flagged as ${category}` : "Content is clean",
    blocked,
  };
}
