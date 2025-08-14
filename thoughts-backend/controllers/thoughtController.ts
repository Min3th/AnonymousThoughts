import { Request, Response } from "express";
import { generateUniqueCode } from "../utils/generateCode";
import Thought from "../models/thoughts";

export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const query: Record<string, any> = {};
    if (category) {
      query.category = category;
    }
    const thoughts = await Thought.find(query);
    res.json(thoughts);
  } catch (err) {
    console.error("Error fetching thoughts:", err);
    res.status(500).json({ error: "Error fetching thoughts!" });
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, content, category } = req.body as {
      topic?: string;
      content?: string;
      category?: string;
    };
    const uniqueCode = generateUniqueCode();

    if (!topic || !content) {
      res.status(400).json({ error: "Topic and content are required!" });
      return;
    }

    const newThought = new Thought({ topic, content, uniqueCode, category });
    await newThought.save();

    res.status(201).json(newThought);
  } catch (err) {
    console.error("Error creating thought:", err);
    res.status(500).json({ error: "Error creating thought!" });
  }
};
