const Thought = require("../models/thoughts");
const generateUniqueCode = require("../utils/generateCode");

exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error("Error fetching thoughts:", err);
    res.status(500).json({ error: "Error fetching thoughts!" });
  }
};

exports.createThought = async (req, res) => {
  try {
    const { topic, content, category } = req.body;
    const uniqueCode = generateUniqueCode();

    if (!topic || !content) {
      return res.status(400).json({ error: "Topic and content are required!" });
    }

    const newThought = new Thought({ topic, content, uniqueCode, category });
    await newThought.save();

    res.status(201).json(newThought);
  } catch (err) {
    console.error("Error creating thought:", err);
    res.status(500).json({ error: "Error creating thought!" });
  }
};
