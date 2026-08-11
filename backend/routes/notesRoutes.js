const express = require("express");
const router = express.Router();

const { generateStudyNotes } = require("../controllers/notesControllers");
const { generateQuiz} = require("../controllers/notesControllers");
const { generateStudyPlan} = require("../controllers/notesControllers");

router.post("/generate", generateStudyNotes);
router.post("/quiz", generateQuiz);
router.post("/study-plan", generateStudyPlan);

module.exports = router;