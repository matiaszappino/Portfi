import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h1 className={classes.title}>Let{"'"}s talk business</h1>
          <h5 className={classes.description}>
            More and more people are everyday thinking of a way to live with
            passive income. Investing in big companies has always been a
            low-risk go to strategy for this, but the problem we found is that
            the tools to make this possible are very expensive and don{"'"}t
            even provide user-friendly UIs, which makes investing in these
            markets a very discouraging experience for amateur investors. Our
            goal is to provide a free tool that everybody can use to start
            building a portfolio with a decent investment strategy.

          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Benchmarks"
              description="Compare your portfolio to industry benchmarks and understand how it performs against various market segments."
              icon={TrendingUp}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="An Interface Thought for the User"
              description="Take advantage of an attractive, professional and friendly user-oriented application to keep an organized and performing asset portfolio."
              icon={DashboardIcon}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Industry Standard Metrics"
              description="Our tool provides the most important performance metrics to measure and improve your investment portfolio."
              icon={AssessmentIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
