import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

class Landing extends Component {
  state = {
    name: "",
  };

  componentDidMount() {
    if (sessionStorage.getItem("user").localeCompare("true") !== 0) {
      window.open("#/Login", "_self");
    }

    sessionStorage.setItem("dataSet", "false");
    window.dispatchEvent(new Event("ReloadTable1"));
    window.dispatchEvent(new Event("ReloadDataSet"));
  }

  renderTableData = () => {
    let tables = JSON.parse(sessionStorage.allReadyTables);
    return tables.rows.map((iter, idx) => {
      this.state.name = iter["username"];
    });
  };

  onClick = () => {
    window.open("#/Upload/Metadata", "_self");
  };

  displayNewData = () => {
    this.props.new();
  };

  displayOldData = () => {
    this.props.old();
  };

  render() {
    return (
      <Card style={{ width: "auto" }} className="text-center">
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot"}> </Card.Text>
        </Card.Header>

        <Card.Text className={"text-hugoob-advanced"}>
          {this.renderTableData()}
          <h4>{"Welcome " + this.state.name + ", choose your next step"}</h4>
        </Card.Text>

        <Card.Body>
          <Button
            className="bg-hugobot"
            onClick={this.onClick}
            href={"#/Upload/Metadata"}
          >
            <i className="fas fa-upload" /> Upload New Data
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button className="bg-hugobot" onClick={this.displayNewData}>
            <i className="fas fa-hammer" /> Process Your Data
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button className="bg-hugobot" onClick={this.displayOldData}>
            <i className="fas fa-book-reader" /> Visualize Your Data
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Landing;
