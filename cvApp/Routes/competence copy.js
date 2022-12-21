const express = require("express");
const { getCompetences, getCompetence, addCompetence, updateCompetence, deleteCompetence } = require("../Controllers/competenceController");
const router = express.Router();

router.get("/getCompetences", getCompetences);
router.get("/getCompetence", getCompetence);
router.post("/addCompetence", addCompetence);
router.put("/updateCompetence/:id", updateCompetence);
router.delete("/deleteCompetence/:id", deleteCompetence);

module.exports = router;
