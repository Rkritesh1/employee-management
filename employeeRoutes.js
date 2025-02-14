const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel"); // Ensure this file exists

// 🔹 Create Employee (POST)
router.post("/employees", async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        const newEmployee = new Employee({ name, email, position, salary });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Get All Employees (GET)
router.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Update Employee (PUT)
router.put("/employees/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Delete Employee (DELETE)
router.delete("/employees/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // ✅ Make sure you're exporting router correctly
