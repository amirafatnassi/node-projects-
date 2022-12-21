const express = require("express");
const router = express.Router();
const userCount=require('../models/userCount');

router.post("/addUserCount", async(req,res)=>{
    await userCount.create(req.body);
    res.send('created !');
});

module.exports = router;
