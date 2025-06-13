import React, { useState } from "react"
import { LoginForm } from "@/components/login-form"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const [mode, setMode] = useState("login") // "login" or "register"
  const navigate = useNavigate()

  // ✅ Register User
  async function getApiRegisterData(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      )

      console.log(response)

      toast.success("Account created successfully!")
      
      // Optional: auto-login or navigate after registration
      navigate('/task/list')
    } catch (error) {
      console.error("Registration failed:", error)
      toast.error(error?.response?.data?.message || "Registration failed.")
    }
  }

  // ✅ Login User
  async function getApiLoginData(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      )

      console.log(response?.data)

      toast.success("Logged in successfully!")
      navigate('/task/list')
    } catch (error) {
      console.error("Login failed:", error)
      toast.error(error?.response?.data?.message || "Login failed.")
    }
  }

  // ✅ Handle form submit from LoginForm
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
