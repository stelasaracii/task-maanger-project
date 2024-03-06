import { useState } from "react";
import React from "react";
import TasksTable from "../components/UserPage/TasksTable";
import Header from "../components/Header/Header";

const UserDashboard: React.FC = () => {
  return (
    <>
    <Header userRole={String(localStorage.getItem('role'))} />
      <div className="container my-5">
        <h1 className="text-center mb-4">Tasks</h1>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <TasksTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
