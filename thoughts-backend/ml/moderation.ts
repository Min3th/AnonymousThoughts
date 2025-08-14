import { InferenceClient } from "@huggingface/inference";

interface ModerationResult {
  category: string;
  reason: string;
  blocked: boolean;
}

interface HFClassification {
  label: string;
  score: number;
}

// 1. Init Hugging Face client
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
export async function moderateContent(title: String, content: String): Promise<ModerationResult> {
  const combined = `${title}\n\n${content}`;

  // Step 1: Local gibberish detection
  if (isGibberish(combined)) {
    return {
      category: "GIBBERISH",
      reason: "Text appears to be gibberish or random characters.",
      blocked: true,
    };
  }

  // Step 2: Use Hugging Face model for moderation
  const hfResult: HFClassification[] = await hf.textClassification({
    model: "facebook/roberta-hate-speech-dynabench-r4-target",
    inputs: combined,
  });

  // hfResult is an array of labels & scores
  // Example: [{ label: 'not-hate', score: 0.97 }, { label: 'hate', score: 0.03 }]
  const hateLabel = hfResult.find((r) => r.label.toLowerCase().includes("hate"));

  let category = "CLEAN";
  if (hateLabel && hateLabel.score > 0.5) {
    category = "HATE_SPEECH";
  }

  const blocked = category !== "CLEAN";

  return {
    category,
    reason: blocked ? `Content flagged as ${category}` : "Content is clean",
    blocked,
  };
}
