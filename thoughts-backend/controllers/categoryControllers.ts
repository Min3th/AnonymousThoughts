import Category from "../models/categories";
import { Request, Response } from "express";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories!" });
  }
};
