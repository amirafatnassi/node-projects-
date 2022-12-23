const express = require("express");
const passport=require('passport');
const { getProduits, getProduit, addProduit, updateProduit, deleteProduit } = require("../controllers/produitController");
const router = express.Router();

router.get("/getProduits",passport.authenticate('bearer',{session:false}),getProduits);
router.get("/getProduit/:id",passport.authenticate('bearer',{session:false}), getProduit);
router.post("/addProduit",passport.authenticate('bearer',{session:false}), addProduit);
router.put("/updateProduit/:id",passport.authenticate('bearer',{session:false}), updateProduit);
router.delete("/deleteProduit/:id",passport.authenticate('bearer',{session:false}),deleteProduit);

module.exports = router;
