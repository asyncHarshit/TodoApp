import React, { useState } from "react"
import { LoginForm } from "@/components/login-form"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
const Auth = () => {
  const [mode, setMode] = useState("login") // "login" or "register"
  const navigate = useNavigate();

  // Register API call
  async function getApiRegisterData(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      )
      console.log("Registration Success:", response.data)
      toast.success("Account created successfully!")
      navigate('/task/list')
    
      
      toast
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Registration failed.")
    }
  }

  // Login API (placeholder for now)
  async function getApiLoginData(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      )
      console.log("Login Success:", response.data)
      toast.success("Logged in successfully!")
      navigate('/task/list')
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Login failed.")
    }
  }

  const handleSubmit = (formData) => {
    if (mode === "login") {
      getApiLoginData(formData)
    } else {
      getApiRegisterData(formData)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black">
      <div className="w-full max-w-sm">
        <LoginForm
          mode={mode}
          onSubmit={handleSubmit}
          onToggleMode={() => setMode(mode === "login" ? "register" : "login")}
        />
      </div>
    </div>
  )
}

export default Auth
