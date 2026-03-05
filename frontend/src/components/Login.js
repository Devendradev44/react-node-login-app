import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  useEffect(()=>{
    const savedUser=localStorage.getItem("username");
    if(savedUser){
      setUsername(savedUser);
    }
  },[]);

  const handleLogin=async(e)=>{
    e.preventDefault();

    try{

      const response=await axios.post("http://localhost:5000/login",{
        username,
        password
      });

      if(response.status===200){
        localStorage.setItem("username",username);
        navigate("/welcome");
      }

    }catch(err){
      setError("Invalid credentials");
    }
  };

  return(
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">LOGIN</h2>

        <form onSubmit={handleLogin}>

          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Enter
          </button>

        </form>

        {error && <p className="error-text">{error}</p>}

      </div>

    </div>
  );
}

export default Login;