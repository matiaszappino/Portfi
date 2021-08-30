import React from 'react'
import "./Navbar.css";
// import avatar from "../../assets/avatar.svg";
import { Link } from 'react-router-dom';
// import SignUp from "../UserSettings/SignUp.js"

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a className="active_link" href="#">
          Main page
        </a>
      </div>
      <div className="navbar__right">
      <i class="fa fa-user-circle"></i>
        <Link to='/signup'>
          LOG IN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
