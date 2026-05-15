import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

import AuthCard from "../components/AuthCard";

import InputField from "../components/InputField";

import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      console.log(res.data);

      login(res.data);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            justify-center
            items-center
            "
    >
      <AuthCard
        title="LOG IN"
        subtitle="Welcome back! Please enter your details"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold">EMAIL</p>

            <InputField
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">PASSWORD</p>

            <InputField
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <Button text="LOG IN" type="submit" />
        </form>
      </AuthCard>
    </div>
  );
}

export default Login;
