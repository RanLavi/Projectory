import React from "react";
import { Component } from "react";
// import "./index.scss"
import {Router, Route, Switch} from "react-router-dom";
import ProjectsListComponent from "./components/projectsList";
import LoginComponent from "./components/login";
import history from "./index"
import AboutComponent from "./components/about"
import SettingsComponent from "./components/settings"
import LogoffComponent from "./components/logoff"


class Routing extends Component {
  goToLogin = () => {
    history.push("/");
  }

  render() {

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route exact path="/projects" component={ProjectsListComponent} />
          <Route exact path="/about" component={AboutComponent} />
          <Route exact path="/settings" component={SettingsComponent} />
          <Route exact path="/logoff" component={LogoffComponent} />
        </Switch>
      </Router>
    );
  }
}

export default Routing;