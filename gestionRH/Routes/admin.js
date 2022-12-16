const express=require("express");
const passport=require('passport');
const { updateAdmin } = require("../Controllers/adminController");
const { login } = require("../Controllers/adminController");
const { register } = require("../Controllers/adminController");
const router=express.Router();

router.post('/register',register);
router.post('/login',login);

router.get('/profile', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

router.put('/updateAdmin/:id',updateAdmin);

module.exports=router;