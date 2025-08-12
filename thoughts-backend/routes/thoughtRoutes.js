const express = require("express");
const router = express.Router();
const thoughtController = require("../controllers/thoughtController");
const moderationController = require("../controllers/moderationController");

router.get("/", thoughtController.getThoughts);
// router.post("/", thoughtController.createThought);
router.post("/", moderationController.moderateThought, thoughtController.createThought);

module.exports = router;
