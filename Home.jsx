import { useState, useEffect } from "react";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const handleAddOrUpdate = async (employee) => {
        if (editingEmployee) {
            await updateEmployee(editingEmployee._id, employee);
        } else {
            await addEmployee(employee);
        }
        fetchEmployees();
        setEditingEmployee(null);
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        fetchEmployees();
    };

    return (
        <div className="container">
            <h2>Employee Management</h2>
            <EmployeeForm onSubmit={handleAddOrUpdate} selectedEmployee={editingEmployee} />
            <EmployeeTable employees={employees} onEdit={setEditingEmployee} onDelete={handleDelete} />
        </div>
    );
};

// ✅ Ensure the default export exists
export default Home;
