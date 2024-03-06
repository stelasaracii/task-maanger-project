import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../store/constants";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function setTokenWithExpiry(token: string) {
    const now = new Date();
    const expirationTime = now.getTime() + 1 * 60 * 60 * 1000; // Calculate expiration time in milliseconds
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", "1");

    setTimeout(() => {
      if (new Date().getTime() >= expirationTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("role");
      }
    }, 60 * 60 * 1000);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post(BASE_URL + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setTokenWithExpiry(response.data.token);
        if (response.data.token) {
          const role = response.data.role;
          localStorage.setItem("role", response.data.role);
          console.log(response.data.role);
          
          if (role === "admin") navigate("/admin");
          else if (role === "user") navigate("/user");
          else navigate("/unauthorized");
          return response;
        }
      } else {
        setError("Login failed due to a server error.");
        console.error("Login failed");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Login failed. Please check your email and password.");
      } else {
        setError("Login failed due to a server error.");
      }
      console.error("Error:", error);
    }
  };

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    formData.email === "" ||
    formData.password === "";

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-image">
      <div
        className="p-4 bg-white rounded-lg shadow-lg"
        style={{ width: "90%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-4"
            disabled={isButtonDisabled}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
