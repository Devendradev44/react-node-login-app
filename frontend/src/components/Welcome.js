import React from "react";
import "./Welcome.css";

function Welcome() {

  const username = localStorage.getItem("username");

  return (
    <div className="welcome-container">
      Welcome, {username}
    </div>
  );

}

export default Welcome;