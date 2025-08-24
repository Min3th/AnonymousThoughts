import * as thoughtController from "../controllers/thoughtController";
import * as moderationController from "../controllers/moderationController";
import express from "express";

const router = express.Router();

router.get("/", thoughtController.getThoughts);
router.get("/:id", thoughtController.getThoughtById);
// router.post("/", thoughtController.createThought);
router.post("/", moderationController.postModeration, thoughtController.createThought);

// Test-only moderation endpoint
// router.post("/moderate", moderationController.postModeration);

export default router;
