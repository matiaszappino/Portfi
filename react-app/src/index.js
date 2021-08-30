import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { PortfiProvider } from "./components/context/portfiContext";
import "assets/scss/material-kit-react.scss?v=1.10.0";


ReactDOM.render(
  <Router>
    <React.Fragment>
      <PortfiProvider>
      <App />
      </PortfiProvider>
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);
