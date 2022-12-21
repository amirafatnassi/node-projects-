const express = require("express");
const { getLangues, getLangue, addLangue, updateLangue, deleteLangue } = require("../Controllers/langueController");
const router = express.Router();

router.get("/getLangues", getLangues);
router.get("/getLangue", getLangue);
router.post("/addLangue", addLangue);
router.put("/updateLangue/:id", updateLangue);
router.delete("/deleteLangue/:id", deleteLangue);

module.exports = router;
