import React, { Component } from "react";

import { Container } from "react-bootstrap";
import { Redirect, Route, HashRouter, Switch } from "react-router-dom";

// import history from "../../History";
import history from '../../../../History'
import '../../../../resources/style/colors.css'

/**
 * in this class you can see the content of the main navbar.
 * it has home, tutorial, Manage, register, log in, upload.
 */

class TirpsContent extends Component {
  render() {
    return (
      <HashRouter history={history}>
        <Switch>         
          <Route path="/Entities">
            <Container fluid={true}>
              <Entities />
            </Container>
          </Route>
          {/* <Redirect from={"/"} to={"/Home"} /> */}
        </Switch>
      </HashRouter>
    );
  }
}

export default TirpsContent;
