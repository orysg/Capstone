"use client"; // Ensures it's a client-side component
import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

export default function SignupCarer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    token: "",
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  // Extract the token from the URL when the component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      setFormData((prevData) => ({ ...prevData, token }));
    } else {
      setError("Invalid or missing token. Please use the invite link.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, token } = formData;

    if (!validatePassword(password)) {
      setError("Password must include 8+ characters, an uppercase letter, a number, and a special character.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:4000/api/signup-carer", {
        token,  // Invitation token from the URL
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess("Registration successful! Redirecting to login page...");

        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card color="white" shadow={true} className="p-6 max-w-md w-full">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Carer Sign-Up
        </Typography>
        <Typography color="gray" className="text-center mb-8 font-normal">
          Complete your registration by filling in the information below
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <Input
              size="lg"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              size="lg"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button className="mt-6" fullWidth type="submit" color="blue">
            Sign Up
          </Button>
          {error && (
            <Typography color="red" className="mt-2 text-center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="green" className="mt-2 text-center">
              {success}
            </Typography>
          )}
          <Typography color="gray" className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/signin" className="font-medium text-blue-500">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
