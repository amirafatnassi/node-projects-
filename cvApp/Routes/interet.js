const express = require("express");
const { getInterets, getInteret, addInteret, updateInteret, deleteInteret } = require("../Controllers/interetController");
const router = express.Router();

router.get("/getInterets", getInterets);
router.get("/getInteret", getInteret);
router.post("/addInteret", addInteret);
router.put("/updateInteret/:id", updateInteret);
router.delete("/deleteInteret/:id", deleteInteret);

module.exports = router;
