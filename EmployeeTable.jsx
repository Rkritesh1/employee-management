import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import EditEmployee from "./EditEmployee";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const deleteEmployee = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    return (
        <div>
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr className="table-dark">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{index + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>${employee.salary}</td>
                                <td>
                                    <Button variant="warning" className="me-2" onClick={() => handleEdit(employee)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteEmployee(employee._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Edit Employee Modal */}
            {selectedEmployee && (
                <EditEmployee
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    employee={selectedEmployee}
                    refreshEmployees={fetchEmployees}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
