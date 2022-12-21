const express = require("express");
const { getcondidatures, getCondidature, postuler } = require("../Controllers/condidatureController");
const router = express.Router();

router.get("/getCondidatures", getcondidatures);
router.get("/getCondidature", getCondidature);
router.post("/postuler", postuler);

module.exports = router;
