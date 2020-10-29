import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Form, Table } from "react-bootstrap";
import cookies from "js-cookie";
import Axios from "axios";

import history from "../../../../History";

/**
 * this class contains the display of the the table from table content
 */

class Entities extends Component {
  state = {
    filterId: "",
    filterFirst: "",
    filterLast: "",
    filterGender: "",
    filterAge: "",
    ready: "",
    myVar: "",
  };

  filter = () => {
    this.setState({
      filterId: document.getElementById("id").value,
      filterFirst: document.getElementById("First_Care_Unit").value,
      filterLast: document.getElementById("Last_Care_unit").value,
      filterGender: document.getElementById("Gender").value,
      filterAge: document.getElementById("Age_Group").value,
    });
    this.forceUpdate();
  };

  componentDidMount() {
    if (sessionStorage.getItem("user").localeCompare("true") !== 0) {
      window.open("#/Login", "_self");
    }
    sessionStorage.setItem("dataSet", "false");
    window.dispatchEvent(new Event("ReloadTable1"));
    window.dispatchEvent(new Event("ReloadDataSet"));
  }

  renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>id</th>
          <th>First Care Unit</th>
          <th>Last Care Unit</th>
          <th>Gender</th>
          <th>Age Group</th>
        </tr>
      </thead>
    );
  };

  renderTableFilter = () => {
    return (
      <thead>
        <tr>
          <th>
            <Form.Control
              id={"id"}
              onChange={this.filter}
              placeholder={"Filter By id"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"First_Care_Unit"}
              onChange={this.filter}
              placeholder={"Filter By First Care Unit"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"Last_Care_unit"}
              onChange={this.filter}
              placeholder={"Filter By Last Care unit"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"Gender"}
              onChange={this.filter}
              placeholder={"Filter By Gender"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"Age_Group"}
              onChange={this.filter}
              placeholder={"Filter By Age Group"}
              type={"text"}
            />
          </th>
        </tr>
      </thead>
    );
  };
  renderTableData = () => {
    // let tables = JSON.parse(sessionStorage.Entities);
    let tables = JSON.parse(window.Entities);
    return tables.Entities.map((iter, idx) => {
      iter = JSON.parse(iter);
      if (
        (this.state.filterId.localeCompare("") === 0 ||
          iter["id"].includes(this.state.filterId)) &&
        (this.state.filterFirst.localeCompare("") === 0 ||
          iter["First_Care_Unit"].includes(this.state.filterFirst)) &&
        (this.state.filterLast.localeCompare("") === 0 ||
          iter["Last_Care_unit"].includes(this.state.filterLast)) &&
        (this.state.filterGender.localeCompare("") === 0 ||
          iter["Gender"].includes(this.state.filterGender)) &&
        (this.state.filterAge.localeCompare("") === 0 ||
          iter["Age_Group"].includes(this.state.filterAge))
      ) {
        return (
          <tr key={idx}>
            <td>{iter["id"]}</td>
            <td>{iter["First_Care_Unit"]}</td>
            <td>{iter["Last_Care_unit"]}</td>
            <td>{iter["Gender"]}</td>
            <td>{iter["Age_Group"]}</td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  // componentWillUnmount() {
  //   clearTimeout(this.myVar);
  // }

  render() {
    let that = this;
    window.addEventListener("ReloadEntitiesTable", function () {
      that.forceUpdate();
    });
    return (
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot"}>Entities </Card.Text>
        </Card.Header>
        <Card.Body>
          <Table striped={true} bordered={true} hover={true}>
            {this.renderTableHeader()}

            {this.renderTableFilter()}
            <tbody>{this.renderTableData()}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default Entities;
