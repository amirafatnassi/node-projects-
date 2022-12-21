const express = require("express");
const { getOffresTravail, getOffreTravail, addOffreTravail, updateOffreTravail, deleteOffreTravail } = require("../Controllers/offreTravailController");
const router = express.Router();

router.get("/getOffreTravails", getOffresTravail);
router.get("/getOffreTravail", getOffreTravail);
router.post("/addOffreTravail", addOffreTravail);
router.put("/updateOffreTravail/:id", updateOffreTravail);
router.delete("/deleteOffreTravail/:id", deleteOffreTravail);

module.exports = router;
