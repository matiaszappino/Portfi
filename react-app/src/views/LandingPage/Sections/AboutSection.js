import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.aboutSection}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h1 className={classes.aboutUsTitle}>About Us</h1>
          <h5 className={classes.description}>
            We{"'"}re a group of passionate Software Developing students who
            became friends during the{" "}
            <a
              href="https://www.holbertonschool.com/"
              target="_blank"
            >
              Holberton School
            </a>{" "}
            Foundations course. Having great team chemistry throughout the whole
            course, we decided to work together on the final portfolio project
            for the school. When trying to come up with a project idea we set as
            one of the priorities to try and solve an existing problem. Having
            financial interests in common, we decided to reach out to a friend
            of ours who works in the finance industry and meet with him to
            discuss any kind of possible improvements to make to the tools he
            uses. We decided that the interface of tools like Bloomberg or
            Morningstar are not very user-friendly. The data and metrics
            displayed are not easy to read, so if the user is not familiarized
            with the calculations behind them, they{"'"}ll have a hard time
            figuring them out. Furthermore, these tools are extremely expensive,
            which is something to be expected provided that they{"'"}re built
            and designed for professional use. Having these problems in mind, we
            decided to create an affordable (as affordable as free!) portfolio
            management tool that displays data and metrics in a way which is
            easy to understand even for an amateur investor.
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
}
