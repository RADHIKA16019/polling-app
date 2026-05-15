import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import AuthCard from "../components/AuthCard";

import InputField from "../components/InputField";

import Button from "../components/Button";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const res = await API.post("/auth/signup", formData);

      console.log(res.data);

      toast.success("Signup successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
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
      <AuthCard title="SIGN UP" subtitle="Create your account to continue">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold">NAME</p>

            <InputField
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <Button text="CREATE ACCOUNT" type="submit" />
        </form>
      </AuthCard>
    </div>
  );
}

export default Signup;
