const express = require("express");
const { getExperience, getExperiences, addExperience, updateExperience, deleteExperience } = require("../Controllers/experienceController");
const router = express.Router();

router.get("/getExperiences", getExperiences);
router.get("/getExperience", getExperience);
router.post("/addExperience", addExperience);
router.put("/updateExperience/:id", updateExperience);
router.delete("/deleteExperience/:id", deleteExperience);

module.exports = router;
