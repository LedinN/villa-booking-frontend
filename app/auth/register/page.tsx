"use client";

import Image from "next/image";
import { useState } from "react";
import AuthService from "@/app/lib/apiService";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { firstName, lastName, email, password, confirmPassword, phone } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await AuthService.register({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      setSuccessMessage("Account created successfully! You can now log in.");
      console.log("Registration successful:", response);

      // Optionally redirect to the login page
      // window.location.href = "/login";
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-2xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/casapinoaltologo.png"
            alt="logo"
            className="w-50"
            width={230}
            height={40}
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">
          Create Account
        </h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your mobile number"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
