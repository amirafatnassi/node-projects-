const express = require("express");
const { getFormations, addFormation, updateFormation, deleteFormation, getFormation } = require("../Controllers/formationController");
const router = express.Router();

router.get("/getFormations", getFormations);
router.get("/getFormation", getFormation);
router.post("/addFormation", addFormation);
router.put("/updateFormation/:id", updateFormation);
router.delete("/deleteFormation/:id", deleteFormation);

module.exports = router;
