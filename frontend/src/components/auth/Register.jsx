// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useTranslation } from "react-i18next";


function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //register method from userservice
  
      const token = localStorage.getItem("token");
      await UserService.register(formData, token);
  
      //clear form fields
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        role: "",
      });
      alert("User registered successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occured while registering user");
    }
  };
  
  return (
    <div className="auth-container">
      <h2>{t("Registration")}</h2>
      <form onSubmit={handleSubmit}>
  
        <div className="form-group">
          <label>{t("Name")}:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("Email")}:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("Password")}:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("Role")}:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Enter your role"
            required
          />
        </div>
        <button type="submit">{t("Register")}</button>
      </form>
    </div>
  );
  

}


export default Register;
