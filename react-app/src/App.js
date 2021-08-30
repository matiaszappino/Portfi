import React from "react";
import "./App.css";
import { /*BrowserRouter as Router, */ Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard.js";

const App = () => {
  return (
    <div>
      <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
