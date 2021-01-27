import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Card, Form, Table } from "react-bootstrap";
import cookies from "js-cookie";
import Axios from "axios";
import TIRPsPie from "./TIRPsPie";

import history from "../../../../History";

/**
 * this class contains the display of the the table from table content
 */

class TIRPsTable extends Component {
  state = {
    currentRow: [],
  };
  constructor(props) {
    super(props);
  }

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
          <th> Next </th>
          <th> Relation </th>
          <th> Symbol </th>
          <th> Vertical Support </th>
          <th> Mean Horizontal Support </th>
          <th> Mean Mean Duration </th>
        </tr>
      </thead>
    );
  };

  renderSelectedTirp = () => {
    let iter = this.state.currentRow;
    return (
      <div>
        <thead>
          <tr>
            <th> Metric </th>

            <th> Value </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current level</td>
            <td>{iter["_TIRP__tirp_size"]}</td>
          </tr>
          <tr>
            <td>Vertical support</td>
            <td>
              {(
                (iter["_TIRP__vertical_support"] /
                  window.window.num_of_entities) *
                100
              ).toFixed(1)}
              %
            </td>
          </tr>
          <tr>
            <td>Mean horizontal_support</td>
            <td>{iter["_TIRP__mean_horizontal_support"]}</td>
          </tr>
          <tr>
            <td>Mean mean duration</td>
            <td>{iter["_TIRP__mean_duration"]}</td>
          </tr>
          <tr>
            <td>Entities</td>
            <td>{iter["_TIRP__vertical_support"]}</td>
          </tr>
        </tbody>
      </div>
    );
  };
  temp = (iter) => {
    this.state.currentRow = iter;
    window.dispatchEvent(new Event("ReloadTirpTable"));
    this.forceUpdate();
  };

  getRel = (tirp) => {
    if (tirp == undefined) return "";
    if (tirp._TIRP__rel.length == 0) {
      return "-";
    }
    if (tirp._TIRP__rel[tirp._TIRP__rel.length - 1] == "finished by")
      return "finish-by";
    return tirp._TIRP__rel[tirp._TIRP__rel.length - 1];
  };

  hasChild = (tirp) => {
    if (tirp == undefined) return "false";
    else {
      if (
        tirp._TIRP__childes.length == 0 ||
        !this.has_childs_class_0(tirp._TIRP__childes)
      )
        return "false";
      else {
        return "true";
      }
    }
  };
  has_childs_class_0 = (childs) => {
    if (childs[0] == true) return true;
    for (var i = 0; i < childs.length; i++) {
      if (childs[i]._TIRP__exist_in_class0) return true;
    }
    return false;
  };

  renderTableData = () => {
    let tables = this.props.table;
    return tables.map((iter, idx) => {
      let x = iter;
      let y = idx;
      if (this.state.currentRow.length == 0) {
        this.state.currentRow = iter;
      }
      return (
        <tr
          //   key={idx.toString()}
          onClick={() => this.temp(iter)}
        >
          {/*<td>{iter["UserID"]}</td>*/}
          <td> {this.hasChild(iter)} </td>
          <td> {this.getRel(iter)} </td>
          <td> {iter["_TIRP__symbols"]} </td>
          <td>
            {" "}
            {(
              (iter["_TIRP__vertical_support"] /
                window.window.num_of_entities) *
              100
            ).toFixed(1)}
            %{" "}
          </td>
          <td> {iter["_TIRP__mean_horizontal_support"]} </td>
          <td> {iter["_TIRP__mean_duration"]} </td>
        </tr>
      );
    });
  };

  render() {
    let that = this;
    window.addEventListener("ReloadEntitiesTable", function () {
      that.forceUpdate();
    });
    return (
      <div>
        <Card>
          <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>current level </Card.Text>
          </Card.Header>
          <Card.Body>
            <Table striped={true} bordered={true} hover={true}>
              {this.renderTableHeader()}

              <tbody>{this.renderTableData()}</tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>current level </Card.Text>
          </Card.Header>
          <Card.Body>
            <Table striped={true} bordered={true} hover={true}>
              {this.renderSelectedTirp()}
            </Table>
          </Card.Body>
        </Card>
        <TIRPsPie row={this.state.currentRow}></TIRPsPie>
      </div>
    );
  }
}

export default TIRPsTable;
