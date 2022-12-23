const express = require("express");
const passport=require('passport');
const {
  register,
  login,
  updateClient,
  deleteClient,
  getClients,
} = require("../controllers/clientController");
const router = express.Router();

router.get("/getClients",getClients);
router.get("/login", login);
router.post("/register", register);
router.put("/updateClient/:id",passport.authenticate('bearer',{session:false}), updateClient);
router.delete("/deleteClient/:id",passport.authenticate('bearer',{session:false}),deleteClient);

module.exports = router;
