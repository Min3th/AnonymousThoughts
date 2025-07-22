// index.js
const express = require("express");
const connectDB = require("./db");
const Thought = require("./thoughts");
const cors = require("cors");

const app = express();
const port = 8080;

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());

app.get("/api/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/thoughts", async (req, res) => {
  try {
    const { topic, content } = req.body;

    if (!topic || !content) {
      return res.status(400).json({ error: "Topic and content are required" });
    }

    const newThought = new Thought({ topic, content });
    await newThought.save();

    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
