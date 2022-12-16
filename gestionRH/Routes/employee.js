const express = require("express");
const {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../Controllers/employeeController");
const router = express.Router();

router.get("/getEmployees", getEmployees);
router.get("/getEmployee", getEmployee);
router.post("/addEmployee", addEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = router;
