import { InferenceClient } from "@huggingface/inference";
import "dotenv/config";

interface ModerationResult {
  category: string;
  reason: string;
  blocked: boolean;
}

interface HFClassification {
  label: string;
  score: number;
}

interface HFTextGenerationResult {
  generated_text: string;
}

// 1. Init Hugging Face client
console.log("HF_TOKEN:", process.env.HF_TOKEN);

const hf = new InferenceClient(process.env.HF_TOKEN);

// 2. Local quick gibberish check
function isGibberish(text: string): boolean {
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

// 3. Main moderation function
export async function moderateContent(title: string, content: string): Promise<ModerationResult> {
  const combined = `${title}\n\n${content}`;

  // Step 1: Local gibberish detection
  if (isGibberish(combined)) {
    return {
      category: "GIBBERISH",
      reason: "Text appears to be gibberish or random characters.",
      blocked: true,
    };
  }

  const prompt = `
  Rate the following text on a scale of 0-1 for hate speech, where 0 is clean and 1 is hate speech(extremely hateful).
  Text: "${combined}"
  Return only the number.
  `;
  const text = "I hate you.";
  // Step 2: Use Hugging Face model for moderation
  const hfResult: HFClassification[] = await hf.textClassification({
    model: "tabularisai/multilingual-sentiment-analysis",
    inputs: text,
  });

  console.log("HF result:", hfResult);
  // const score = parseFloat(hfResult.generated_text.trim());
  // console.log("Parsed score:", score);
  let category = "CLEAN";
  // if (score > 0.5) {
  //   category = "HATE_SPEECH";
  // }
  const highest = hfResult.reduce((prev, current) => {
    return current.score > prev.score ? current : prev;
  });
  if (highest.label === "Very Negative" || highest.label === "Negative") {
    category = "HATE_SPEECH";
  }
  const blocked = category !== "CLEAN";

  return {
    category,
    reason: blocked ? `Content flagged as ${category}` : "Content is clean",
    blocked,
  };
}
