const Thought = require("../models/thoughts");
const generateUniqueCode = require("../utils/generateCode");

exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createThought = async (req, res) => {
  try {
    const { topic, content, category } = req.body;
    const uniqueCode = generateUniqueCode();

    if (!topic || !content) {
      return res.status(400).json({ error: "Topic and content are required" });
    }

    const newThought = new Thought({ topic, content, uniqueCode, category });
    await newThought.save();

    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
