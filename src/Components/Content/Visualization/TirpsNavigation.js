import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import { Link, HashRouter } from "react-router-dom";

import History from "../../../History";
import "../../../resources/style/colors.css";

/**
 * this class is shown the navigation in the tirps functions
 */

class TirpsNavigation extends Component {
  render() {
    return (
      <HashRouter history={History}>
        <Navbar className={"navbar-tirps"} variant={"light"}>
          <div className={"navbar-icons"}>
            <Link to={"/TirpsApp/Entities"}>
              <i className={"fa fa-users"} /> Entities
            </Link>
            <Link to={"/TirpsApp/TestRouterB"}>
              <i className={"fa fa-bath"} /> TestRouterB
            </Link>
          </div>
        </Navbar>
      </HashRouter>
    );
  }
}

export default TirpsNavigation;
