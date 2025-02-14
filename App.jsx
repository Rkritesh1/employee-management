import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

const App = () => {
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Employee Management System</h2>
            <AddEmployee />
            <EmployeeTable />
            <EditEmployee/>
        </div>
    );
};

export default App;
