import React, { Component } from "react";

import { Container } from "react-bootstrap";
import { Redirect, Route, HashRouter, Switch } from "react-router-dom";

import history from "../../History";
import Login from "../Login/Login";
import Manage from "./Manage/Manage";
import Register from "../Login/Register";
import TableContent from "./Tables/TableContent";
import Tutorial from "./Tutorial";
import UploadDataset from "./UploadDataset/UploadDataset";
import TirpsApp from "./Visualization/TirpsApp";

import "../../resources/style/colors.css";

/**
 * in this class you can see the content of the main navbar.
 * it has home, tutorial, Manage, register, log in, upload.
 */

class Content extends Component {
  render() {
    return (
      <HashRouter history={history}>
        <Switch>
          <Route path={"/Home"}>
            <TableContent />
          </Route>
          <Route path="/Tutorial">
            <Container>
              <Tutorial />
            </Container>
          </Route>
          <Route path="/Manage">
            <Container>
              <Manage />
            </Container>
          </Route>
          <Route path="/Register">
            <Container>
              <Register />
            </Container>
          </Route>
          <Route path="/Login">
            <Container>
              <Login />
            </Container>
          </Route>
          <Route path="/TirpsApp">            
            <TirpsApp />           
          </Route>
          <Route path="/Upload">
            <Container fluid={true}>
              <UploadDataset />
            </Container>
          </Route>
          <Redirect from={"/"} to={"/Home"} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Content;
