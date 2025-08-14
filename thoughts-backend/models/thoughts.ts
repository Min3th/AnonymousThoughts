import mongoose from "mongoose";

const ThoughtSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    content: { type: String, required: true },
    uniqueCode: { type: String, unique: true },
    category: {
      type: String,
      enum: ["Love", "Sad", "Happy", "Bliss", "Neutral"],
      required: true,
    },
  },
  { timestamps: true }
);

const Thought = mongoose.model("Thought", ThoughtSchema);
export default Thought;
