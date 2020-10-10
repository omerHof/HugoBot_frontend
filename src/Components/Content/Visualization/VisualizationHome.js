import React, { Component } from "react";

// import { Button, Card, Col, Form, Row } from "react-bootstrap";
// import Axios from "axios";
// import cookies from "js-cookie";
// import history from "../../../History";

class VisualizationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetName: sessionStorage.getItem("datasetReadyName"),
    };
  }

  render() {
    return <h1>{this.state.datasetName}</h1>;
  }
}
export default VisualizationHome;
