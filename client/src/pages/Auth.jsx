import React, { useState } from "react"
import { LoginForm } from "@/components/login-form"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const [mode, setMode] = useState("login")
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_API_URL;


  async function getApiRegisterData(formData) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/register`,
        formData,
        {withCredentials : true}
      )

      console.log(response)

      toast.success("Account created successfully!")
      
      navigate('/task/list')
    } catch (error) {
      console.error("Registration failed:", error.data)
      toast.error(error?.response?.data?.message || "Registration failed.")
    }
  }

  async function getApiLoginData(formData) {
    try {
      const response = await axios.post(
         `${baseUrl}/api/auth/login`,
        formData,
        {withCredentials : true}
      )

      console.log(response?.data)

      toast.success("Logged in successfully!")
      navigate('/task/list')
    } catch (error) {
      console.error("Login failed:", error)
      toast.error(error?.response?.data?.message || "Login failed.")
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
