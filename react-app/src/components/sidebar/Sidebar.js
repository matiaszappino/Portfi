import "./Sidebar.css";
import logo from "../../assets/logo.png";
import React from "react";
// import UserSettings from "../UserSettings/UserSettings.js"
// import PortfolioA from "../Portfolios/PortfolioA.js"
// import PortfolioB from "../Portfolios/PortfolioB.js"
// import PortfolioC from "../Portfolios/PortfolioC.js"
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div className={props.sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            exact
            to="/"
          >
          <h3>PORTFI</h3>
          </NavLink>
        </div>
        <i
          onClick={() => props.closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      <div className="sidebar__menu">
        <div>
          <NavLink
            style={{ textDecoration: "none" }}
            exact
            className="sidebar__link"
            activeClassName="active_menu_link"
            to="/dashboard"
          >
            <i className="fa fa-home" />
            Dashboard
          </NavLink>
        </div>
        {/* <h2>MY PORTFOLIOS</h2>
          <NavLink to='/portfolioa'>
            <div className="sidebar__link">
              <i className="fa fa-briefcase"></i>
              Portfolio A
            </div>
          </NavLink>
          <NavLink to='/portfoliob'>
            <div className="sidebar__link">
              <i className="fa fa-briefcase"></i>
              Portfolio B
            </div>
          </NavLink>
          <NavLink to='/portfolioc'>
            <div className="sidebar__link">
              <i className="fa fa-briefcase"></i>
              Portfolio C
            </div>
          </NavLink> */}
        <NavLink
          exact
          style={{ textDecoration: "none" }}
          className="sidebar__link"
          activeClassName="active_menu_link"
          to="/benchmarks"
        >
          <i className="fa fa-line-chart"></i>
          Benchmark
        </NavLink>
        {/* <NavLink to='/usersettings'>
            <div className="sidebar__link">
              <i className="fa fa-wrench"></i>
              User Settings
            </div>
          </NavLink>
          <div className="sidebar__logout">
            <i className="fa fa-power-off"></i>
            Log out
          </div> */}
      </div>
    </div>
  );
};
export default Sidebar;
