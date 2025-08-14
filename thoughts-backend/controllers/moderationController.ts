import { NextFunction, Request, Response } from "express";

const { moderateContent } = require("../ml/moderation");

export const postModeration = async (req: Request, res: Response, next: NextFunction) => {
  const { topic, content } = req.body;
  if (!topic || !content) {
    return res.status(400).json({ error: "Topic and content are required!" });
  }
  try {
    const result = await moderateContent(topic, content);
    if (result.blocked) {
      return res.status(400).json({ error: result.reason });
    }
    next(); // pass control to the next middleware (createThought)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Moderation failed" });
  }
};
