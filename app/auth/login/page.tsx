"use client";
import Image from "next/image";
import { useState } from "react";
import AuthService from "@/app/lib/apiService";


export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await AuthService.login({email, password});
      console.log("Login successful:" + response);

      localStorage.setItem("token", response.token);

      //window.location.href = "/";
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/casapinoaltologo.png"
          alt="logo"
          className="w-40"
          width={160}
          height={40}
        />
      </div>

      <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">
        Welcome Back!
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email Address */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="E-mail address"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Create Account */}
        <div className="flex items-center justify-between mb-4">
          <a
            href="/auth/signup"
            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>
  );
}
