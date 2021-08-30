import { title } from "assets/jss/material-kit-react.js";

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "10px",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "2.25rem",
    lineHeight: "1.5em",
    fontWeight: "700"
  },
  aboutUsTitle: {
    ...title,
    marginBottom: "1rem",
    marginTop: "10px",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "2.00rem",
    lineHeight: "1.5em",
    fontWeight: "700"
  },
  description: {
    color: "#999",
    fontSize: "1.0rem",
    fontWeight: "300",
    lineHeight: "1.55em",
    marginBottom: "20px",
  },
  aboutSection: {
    padding: "20px 0",
    textAlign: "center",
  },
};

export default productStyle;
