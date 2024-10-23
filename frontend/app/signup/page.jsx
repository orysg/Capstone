"use client";
import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, agreeToTerms } = formData;

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must include 8+ characters, an uppercase letter, a number, and a special character.");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
        password,
        userType: "Admin",
      });

      if (response.status === 201 || response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
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
          Sign Up
        </Typography>
        <Typography color="gray" className="text-center mb-8 font-normal">
          Create your account by filling in the information below
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <Input
              size="lg"
              name="name"
              label="Full Name"
              value={formData.name}
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
          <Checkbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            label={
              <Typography variant="small" color="gray">
                I agree to the{" "}
                <a href="#" className="font-medium text-blue-500">
                  Terms and Conditions
                </a>
              </Typography>
            }
          />
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
