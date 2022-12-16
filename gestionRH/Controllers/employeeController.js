const employees = require("../models/employee");

exports.getEmployees = async (req, res) => {
  try {
    const result = await employees.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await employees.findById(req.params.id);
    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(401).send("employee not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const employee = await employees.create(req.body);
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    await employees.findByIdAndUpdate(req.params.id, req.body);
    const updatedEmployee = await employees.findById(req.params.id);
    res.status(200).send(updatedEmployee);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await employees.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedEmployee);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
