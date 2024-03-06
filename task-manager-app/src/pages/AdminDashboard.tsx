import { useState } from "react";
import React from "react";
import UsersTable from "../components/AdminPage/UserTable";
import Header from "../components/Header/Header";
import AllTasksTable from "../components/AdminPage/AllTasksTable";
import { useLocation } from "react-router-dom";

const AdminDashboard: React.FC = () => {

  const location = useLocation();

  const title = location.pathname === "/admin" ? "Users" : "Tasks";
  
  const renderContent = () => {
    if (location.pathname === '/admin') {
      return <UsersTable />;
    } else if (location.pathname === '/admin-tasks') {
      return <AllTasksTable />;
    } else {
      return null; 
    }
  };

  return (
    <>
    <Header userRole={String(localStorage.getItem('role'))} />
      <div className="container my-5">
        <h1 className="text-center mb-4">{title}</h1>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
