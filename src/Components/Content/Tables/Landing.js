import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

class Landing extends Component {
  state = {
    name: "",
  };

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

        <Card.Text>
          {this.renderTableData()}
          {"Welcome " + this.state.name + ", choose your next step"}
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
