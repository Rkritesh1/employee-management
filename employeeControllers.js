const Employee = require("../models/Employee");

// 🔹 Create Employee
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        if (!name || !email || !position || !salary) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const employee = new Employee({ name, email, position, salary });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Fetch All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/employees", {
            name,
            email,
            position, // ✅ Ensure this is included
            salary,   // ✅ Ensure this is included
        });

        console.log("Employee added:", response.data);
        setEmployees([...employees, response.data]);
    } catch (error) {
        console.error("Error adding employee:", error.response?.data || error.message);
    }
};


// 🔹 Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, { name, email, position, salary }, { new: true });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
