import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./Login/Login";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { UsersProvider } from "./store/UserProvider";
import UnauthorizedScreen from "./pages/UnAuthorizedPage";
import { TasksProvider } from "./store/TaskProvider";
function App() {

  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/admin",
      element: userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/unauthorized" />,
    },
    {
      path: "/admin-tasks",
      element: userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/unauthorized" />,
    },
    {
      path: "/user",
      element: userRole === 'user' ? <UserDashboard /> : <Navigate to="/unauthorized" />,
    },
    { path: "/unauthorized", element: <UnauthorizedScreen /> },
    { path: "*", element: <Navigate to="/unauthorized" /> },
  ]);
  return (
    <UsersProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </UsersProvider>
  );
}

export default App;
