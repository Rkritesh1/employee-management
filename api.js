import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getEmployees = async () => axios.get(API_URL);
export const addEmployee = async (employee) => axios.post(API_URL, employee);
export const updateEmployee = async (id, employee) => axios.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = async (id) => axios.delete(`${API_URL}/${id}`);
