import express from "express";
import * as categoryController from "../controllers/categoryControllers";

const router = express.Router();

router.get("/categories", categoryController.getCategories);

export default router;
