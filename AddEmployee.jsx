import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const AddEmployee = () => {
    const [formData, setFormData] = useState({ name: "", email: "", position: "", salary: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (!formData.name || !formData.email || !formData.position || !formData.salary) {
            setError("All fields are required!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/employees", formData);
            setSuccess("Employee added successfully!");
            setFormData({ name: "", email: "", position: "", salary: "" });
        } catch (error) {
            setError("Error adding employee.");
        }
    };

    return (
        <div className="p-3 border rounded bg-light">
            <h4>Add Employee</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="text" name="position" value={formData.position} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">Add Employee</Button>
            </Form>
        </div>
    );
};

export default AddEmployee;
