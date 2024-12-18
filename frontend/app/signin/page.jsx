"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios"; // To handle API requests
import jwtDecode from "jwt-decode"; // Correct import
import Image from "next/image";

function Login1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Regex for email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Regex for password complexity validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Front-end validation before sending request
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, contain an uppercase letter, a number, and a special character."
      );
      return;
    }

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;

      if (!token) {
        setError("No token received from server.");
        return;
      }

      // Decode the token to check user role (if needed)
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.userType;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);

      // Route based on role
      if (userRole === "Admin") {
        router.push("/dashboard"); // You can update this to go to your specific route
      } else {
        router.push("/dashboard"); // Change this as per your role-based routing logic
      }
    } catch (error) {
      console.log("Error object:", error); // Log the entire error object for debugging
    
      // Handle errors (e.g., invalid credentials, server error)
      if (error.response) {
        // Check if there's a response from the server
        console.log("Error response:", error.response); // Log the error response for more details
        console.log("Error response data:", error.response.data); // Log the response data
    
        // Display the error message from the server, if available
        if (error.response.data && error.response.data.error) {
          setError(error.response.data.error);  // Set the specific error message from the server
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        console.log("No server response, error:", error.message); // Log error message if no response
        setError("An error occurred. Please check your network and try again.");
      }
    }
  }
  
  return (
    <section className="px-8">
      <div className="container mx-auto h-screen grid place-items-center">
        <Card
          shadow={false}
          className="md:px-24 md:py-14 py-8 border border-gray-300"
        >
          <CardHeader shadow={false} floated={false} className="text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:text-4xl"
            >
              Login
            </Typography>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 md:mt-12"
            >
              <div>
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Your Email
                  </Typography>
                </label>
                <Input
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Password
                  </Typography>
                </label>
                <Input
                  id="password"
                  color="gray"
                  size="lg"
                  type="password"
                  name="password"
                  placeholder="******"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <Typography color="red" className="text-center">
                  {error}
                </Typography>
              )}

              <Button
                size="lg"
                className="bg-primaryColour text-night hover:bg-secondaryColour"
                fullWidth
                type="submit"
              >
                Sign In
              </Button>

              <Button
                variant="outlined"
                size="lg"
                className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                fullWidth
              >
                <Image
                  src="https://www.material-tailwind.com/logos/logo-google.png"
                  alt="google"
                  width={24}
                  height={24}
                />
                Sign in with Google
              </Button>

              <Typography
                variant="small"
                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
              >
                Upon signing in, you consent to abide by our{" "}
                <a href="#" className="text-gray-900">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="#" className="text-gray-900">
                  Privacy Policy.
                </a>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default Login1;
