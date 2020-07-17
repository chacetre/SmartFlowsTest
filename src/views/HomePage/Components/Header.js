import React from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#7DA2B5",
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Bonjour Hector Dupond</Typography>
    </div>
  );
}

export default Header;
