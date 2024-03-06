import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import './Header.css';
const onLogout = (navigate: NavigateFunction) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/", { replace: true });
};

interface HeaderProps {
  userRole: string;
}

function Header({ userRole }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand className="pl-4">Task Manager</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
      <Nav className="ml-auto"></Nav>
      <Nav>
        <Nav.Link href="admin-tasks">View Tasks</Nav.Link>
        <Button className="ml-8" variant="outline-light" onClick={() => onLogout(navigate)}>Logout</Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Header;
