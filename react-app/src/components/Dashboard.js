import { useState } from "react";
import React from 'react'
import Main from "./main/Main";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import UserSettings from "./UserSettings/UserSettings.js"
import PortfolioA from "./Portfolios/PortfolioA.js"
import PortfolioB from "./Portfolios/PortfolioB.js"
import PortfolioC from "./Portfolios/PortfolioC.js"
import { Switch, Route } from "react-router-dom";
// import SignUp from "./UserSettings/SignUp";
// import SignIn from "./UserSettings/SignIn";
import Benchmarks from "./Benchmarks"

const Dashboard = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
      <div className="container">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          <Switch>
            <Route path="/dashboard" exact component={Main} />
            <Route path="/benchmarks" component={Benchmarks} />
            <Route path="/portfolioa" component={PortfolioA} />
            <Route path="/portfoliob" component={PortfolioB} />
            <Route path="/portfolioc" component={PortfolioC} />
            <Route path="/usersettings" component={UserSettings} />
            {/* <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} /> */}
          </Switch>
      </div>
  );
};

export default Dashboard;
