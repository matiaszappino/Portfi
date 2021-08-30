import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import "./LandingPage.css"
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import AboutSection from "./Sections/AboutSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div  id="home" className="headerGeneral">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="PORTFI"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Investing Starts With Us.</h1>
              <h4 className={classes.titleSub}>
                Portfi provides a detailed analisis on a
                customizable stock portfolio provided by the user. Our
                application offers some of the most relevant tools that high
                price applications offer while being free to use and maintaining
                a nice user-friendly experience.
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                href="/dashboard"
                rel="noopener noreferrer"
              >
                <i className="fas fa-chart-line" />
                GO TO DASHBOARD
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div id="features">
          <ProductSection />
          </div>
          <div id="about">
          <TeamSection />
          <AboutSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
