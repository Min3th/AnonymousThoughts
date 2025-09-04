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

const hf = new InferenceClient(process.env.HF_TOKEN);

// Function to check spam text input like "sda dsd ds asd sda nvfdsj"
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

// function to moderate content (gibberish detection + harmful content detection)
export async function moderateContent(title: string, content: string): Promise<ModerationResult> {
  const combined = `${title}\n\n${content}`;

  if (isGibberish(combined)) {
    return {
      category: "GIBBERISH",
      reason: "Text appears to be gibberish or random characters.",
      blocked: true,
    };
  }

  const hfResult: HFClassification[] = await hf.textClassification({
    model: "tabularisai/multilingual-sentiment-analysis",
    inputs: combined,
  });

  let category = "CLEAN";
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
