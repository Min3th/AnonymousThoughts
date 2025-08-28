import { generateUniqueCode } from "../utils/generateCode";
import Thought from "../models/thoughts";
export const getThoughts = async (req, res) => {
    try {
        const category = req.query.category;
        const query = {};
        if (category) {
            query.category = category;
        }
        const thoughts = await Thought.find(query).sort({ createdAt: -1 });
        res.json(thoughts);
    }
    catch (err) {
        console.error("Error fetching thoughts:", err);
        res.status(500).json({ error: "Error fetching thoughts!" });
    }
};
export const getThoughtById = async (req, res) => {
    try {
        const id = req.params.id;
        const thought = await Thought.findById(id);
        const query = {};
        if (!thought) {
            res.status(404).json({ error: "Thought not found!" });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        console.error("Error fetching thought by Id:", err);
        res.status(500).json({ error: "Error fetching thought by Id!" });
    }
};
export const createThought = async (req, res) => {
    try {
        const { topic, content, category } = req.body;
        const uniqueCode = generateUniqueCode();
        if (!topic || !content) {
            res.status(400).json({ error: "Topic and content are required!" });
            return;
        }
        const newThought = new Thought({ topic, content, uniqueCode, category });
        await newThought.save();
        res.status(201).json(newThought);
    }
    catch (err) {
        console.error("Error creating thought:", err);
        res.status(500).json({ error: "Error creating thought!" });
    }
};
