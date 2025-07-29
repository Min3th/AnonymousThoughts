const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  uniqueCode: { type: String, unique: true },
  category: {
    type: String,
    enum: ["love", "sad", "happy", "bliss", "neutral"],
    required: true,
  },
});

module.exports = mongoose.model("Thought", ThoughtSchema);
