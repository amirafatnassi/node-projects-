const express = require("express");
const { register, login } = require("../Controllers/userController");
const router = express.Router();

router.post("/users", register);
router.get("/login", login);

module.exports = router;