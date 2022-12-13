const express = require("express");
const { emailWithText, emailWithEjs, emailWithAttachments } = require("../Controllers/emailController");
const router = express.Router();

router.post("/emailWithText", emailWithText);
router.post("/emailWithEjs", emailWithEjs);
router.post("/emailWithAttachments", emailWithAttachments);

module.exports = router;
