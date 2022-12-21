const express = require("express");
const { getCvs, getCv, addCv, updateCv, deleteCv, affectCompetenceToCv, affectFormationToCv, affectInteretToCv, affectExperienceToCv, affectLangueToCv } = require("../Controllers/cvController");
const router = express.Router();

router.get("/getCvs", getCvs);
router.get("/getCv/:id", getCv);
router.post("/addCv", addCv);
router.put("/updateCv/:id", updateCv);
router.delete("/deleteCv/:id", deleteCv);
router.put('/affectCompetence/:cvId/:competenceId',affectCompetenceToCv);
router.put('/affectFormation/:cvId/:formationId',affectFormationToCv);
router.put('/affectInteret/:cvId/:interetId',affectInteretToCv);
router.put('/affectExperience/:cvId/:experienceId',affectExperienceToCv);
router.put('/affectLangue/:cvId/:langueId',affectLangueToCv);

module.exports = router;
