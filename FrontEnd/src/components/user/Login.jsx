import React, { useState } from "react";
import "./user.css";
import axios from "../../../utils/Axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", { email, password })
      .then((res) => {
        if (res.data.user == null) {
          toast.success("User not found !");
        } else {
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.auth));
          toast.success("User Login successfully");
          navigate("/admin");
          refreshPage();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/register">
          <h3
            style={{
              fontSize: "10px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            if you don't have accout then Register !
          </h3>
        </Link>
        <button type="submit" onSubmit={handleSubmit} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
