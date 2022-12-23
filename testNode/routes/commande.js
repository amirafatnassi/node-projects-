const express = require("express");
const passport=require('passport');
const { getCommandes, getCommande, addCommande, updateCommande, deleteCommande, affecterClientACommande, retirerClientDeCommande, affecterProduitACommande, retirerProduitDeCommande, addProduitToCart, retirerProduitFromCart } = require("../controllers/commandeController");
const router = express.Router();

router.get("/getCommandes",passport.authenticate('bearer',{session:false}),getCommandes);
router.get("/detailCommande/:id",passport.authenticate('bearer',{session:false}), getCommande);
router.post("/addCommande",passport.authenticate('bearer',{session:false}), addCommande);
router.put("/updateCommande/:id",passport.authenticate('bearer',{session:false}), updateCommande);
router.delete("/deleteCommande/:id",passport.authenticate('bearer',{session:false}),deleteCommande);
router.put("/affectClient/:commandeId/:clientId",passport.authenticate('bearer',{session:false}),affecterClientACommande);
router.put("/retirerClient/:commandeId/:clientId",passport.authenticate('bearer',{session:false}),retirerClientDeCommande);
router.put("/addProduitToCart/:commandeId/:produitId",passport.authenticate('bearer',{session:false}),addProduitToCart);
router.put("/retirerProduitFromCart/:commandeId/:produitId",passport.authenticate('bearer',{session:false}),retirerProduitFromCart);

module.exports = router;
