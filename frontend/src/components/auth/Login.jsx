// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "@mui/material";
import Register from "./Register";
import { toast } from "react-toastify";

function Login({ handleLogin }) {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored", 
        });
        navigate("/profile");
        handleLogin(true);
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="text-red-700 ">{t("Login")}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>{t("Password")}:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className="btn" type="submit">{t("Login")}</button>
      </form>
      <Button className="btn btn-register" onClick={() => setOpen(true)} variant="text">
        {t("Registration")}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Register />
      </Modal>
    </div>
  );
}

export default Login;
