import React, { useState } from "react";
import "./user.css";
import axios from "../../../utils/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/user",{
        name,
        email,
        password
    }).then((response)=>{
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", JSON.stringify(response.data.auth))
        console.log(response.data);
        navigate('/login')
        toast.success("User register successfully")
    }).catch((err)=>{
        console.log(err.message);
    })
    
  };
//   console.log(name,email,password);

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <Link to="/login">
          <h3
            style={{
              fontSize: "10px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Already have accout then Login !
          </h3>
        </Link>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
