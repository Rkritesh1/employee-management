import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const EditEmployee = ({ show, handleClose, employee, refreshEmployees }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        salary: ""
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                email: employee.email,
                position: employee.position,
                salary: employee.salary
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/employees/${employee._id}`, formData);
            refreshEmployees();
            handleClose();
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

                    <Button variant="primary" type="submit">Save Changes</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditEmployee;
