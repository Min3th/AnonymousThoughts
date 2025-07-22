const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Thought", ThoughtSchema);
