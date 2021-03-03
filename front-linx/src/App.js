import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/index";
import City from "./components/City/index";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0.8)
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }} className="App">
      <Router>
        <Header /> : <div></div>
        <main className={classes.content}>
          : (
            <div>
            (
                <div>
              <Route path="/city" component={City} />
            </div>
          </div>
        </main>
      </Router>
    </div>
  );
}
