import React, { Component } from "react";

import { Container } from "react-bootstrap";
import { Redirect, Route, HashRouter, Switch } from "react-router-dom";

import DatasetInfo from "./DatasetInfo";
import Analysis from "./Analysis";
import States from "./States";
import Entities from "./Entities";
import TIRPs from "./TIRPs";
import DiscriminativeTIRPs from "./DiscriminativeTIRPs";
import TIRPsSearch from "./TIRPsSearch";
import PTIRPsSearch from "./PTIRPsSearch";
import History from "../../../../History";
import "../visualization.css";

/**
 * in this class you can see the content of the main navbar.
 * it has home, tutorial, Manage, register, log in, upload.
 */

class TirpsContent extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path={"/TirpsApp/DatasetInfo"}>
            <Container>
              <DatasetInfo />
            </Container>
          </Route>
          {/* <Route path={"/TirpsApp/Analysis"}>
            <Container>
              <Analysis />
            </Container>
          </Route> */}
          <Route path={"/TirpsApp/States"}>
            <Container>
              <States />
            </Container>
          </Route>
          <Route path={"/TirpsApp/Entities"}>
            <Container>
              <Entities />
            </Container>
          </Route>
          <Route path={"/TirpsApp/TIRPs"}>
            <Container fluid>
              <TIRPs />
            </Container>
          </Route>
          <Route path={"/TirpsApp/DiscriminativeTIRPs"}>
            <Container fluid>
              <DiscriminativeTIRPs />
            </Container>
          </Route>
          <Route path={"/TirpsApp/TIRPsSearch"}>
            <Container fluid>
              <TIRPsSearch />
            </Container>
          </Route>
          <Route path={"/TirpsApp/PTIRPsSearch"}>
            <Container fluid>
              <PTIRPsSearch />
            </Container>
          </Route>
          <Redirect from={"/TirpsApp"} to={"/TirpsApp/DatasetInfo"} />
        </Switch>
      </HashRouter>
    );
  }
}

export default TirpsContent;
