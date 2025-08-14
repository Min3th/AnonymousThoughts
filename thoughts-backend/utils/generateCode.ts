import Thought from "../models/thoughts";

export function generateUniqueCode(prefix = "THO") {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars
  const timestampPart = Date.now().toString(36).toUpperCase(); // time-based
  return `${prefix}-${randomPart}${timestampPart}`;
}

// Update all thoughts that don't have createdAt
export async function addCreatedAtToExistingThoughts(): Promise<void> {
  try {
    const result = await Thought.updateMany({ createdAt: { $exists: false } }, [
      { $set: { createdAt: { $toDate: "$_id" } } },
    ]);

    console.log(`Matched ${result.matchedCount}, modified ${result.modifiedCount} thoughts with createdAt`);
  } catch (err) {
    console.error("Error updating thoughts:", err);
  }
}
