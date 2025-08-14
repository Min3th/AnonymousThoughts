import * as thoughtController from "../controllers/thoughtController";
import * as moderationController from "../controllers/moderationController";

const express = require("express");
const router = express.Router();

router.get("/", thoughtController.getThoughts);
// router.post("/", thoughtController.createThought);
router.post("/", moderationController.postModeration, thoughtController.createThought);

// Test-only moderation endpoint
router.post("/moderate", moderationController.postModeration);

module.exports = router;
