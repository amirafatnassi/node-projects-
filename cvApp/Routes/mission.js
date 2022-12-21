const express=require('express');
const { getMissions, getMission, addMission, updateMission, deleteMission, affectEmployeeToMission, deleteEmployeeFromMission } = require('../Controllers/missionController');
const router=express.Router();

router.get('/getMissions',getMissions);
router.get('/getMission/:id',getMission);
router.post('/addMission',addMission);
router.put('/updateMission/:id',updateMission);
router.delete('/deleteMission/:id',deleteMission);
router.put("/affectEmployeeToMission/:idMission/:idEmployee", affectEmployeeToMission);
router.put("/deleteEmployeeFromMission/:idMission/:idEmployee", deleteEmployeeFromMission);

module.exports=router;