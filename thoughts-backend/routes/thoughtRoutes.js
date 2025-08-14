const express = require("express");
const router = express.Router();
const thoughtController = require("../controllers/thoughtController");
const moderationController = require("../controllers/moderationController");

router.get("/", thoughtController.getThoughts);
// router.post("/", thoughtController.createThought);
router.post("/", moderationController.postModeration, thoughtController.createThought);

// Test-only moderation endpoint
router.post("/moderate", moderationController.postModeration);

module.exports = router;
