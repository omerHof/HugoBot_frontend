import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Form, Table } from "react-bootstrap";
import cookies from "js-cookie";
import Axios from "axios";

import history from "../../../History";

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

  // onClick={(e) =>  {this.props.CollectData( iter.DatasetName); }}

  renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>
            <Form.Control
              id={"id"}
              onChange={this.filter}
              placeholder={"id"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"First_Care_Unit"}
              onChange={this.filter}
              placeholder={"First_Care_Unit"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"Last_Care_unit"}
              onChange={this.filter}
              placeholder={"Last_Care_unit"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"Gender"}
              onChange={this.filter}
              placeholder={"Gender"}
              type={"text"}
            />
          </th>
          <th>
            <Form.Control
              id={"Age_Group"}
              onChange={this.filter}
              placeholder={"Age_Group"}
              type={"text"}
            />
          </th>
        </tr>
      </thead>
    );
  };

  async getEntities(datasetName) {
    const url = window.base_url + "/getEntities";
    const formData = new FormData();
    // formData.append("file", file);
    formData.append("data_set_name", datasetName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    return Axios.post(url, formData, config);
  }

  renderTableData = () => {
    if ("datasetReadyName" in sessionStorage) {
      this.getEntities(sessionStorage.getItem("datasetReadyName")).then(
        (response) => {
          let table = JSON.stringify(response.data);
          sessionStorage.setItem("Entities", table);
        }
      );

      let tables = JSON.parse(sessionStorage.Entities);

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
    }
  };

  render() {
    let that = this;
    window.addEventListener("ReloadHomeTable", function () {
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
            <tbody>{this.renderTableData()}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default Entities;
