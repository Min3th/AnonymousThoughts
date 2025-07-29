const express = require("express");
const router = express.Router();
const thoughtController = require("../controllers/thoughtController");

router.get("/", thoughtController.getThoughts);
router.post("/", thoughtController.createThought);

module.exports = router;
