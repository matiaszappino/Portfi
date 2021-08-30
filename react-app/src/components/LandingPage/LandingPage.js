import React from "react";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing_title">
      This is a landing page.
      <NavLink to="/dashboard">Dashboard</NavLink>{" "}
    </div>
  );
};

export default LandingPage;
