import React, { Component } from "react";
import { Card, Form, Table } from "react-bootstrap";

import TIRPsPie from "./TIRPsPie";
import TIRPTimeLine from "./TIRPTimeLine";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
      <Container>
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
      </Container>
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
      
      <Container fluid>
        <Row>
          <Col sm={9}>
          <Card>
          <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot text-hugoob-advanced"}>Tirp's Table </Card.Text>
          </Card.Header>
          <Card.Body>
          <div className="vertical-scroll vertical-scroll-advanced">
            <Table striped={true} hover={true} scroll={true}>
              {this.renderTableHeader()}
              <tbody>{this.renderTableData()}</tbody>
            </Table>
            </div>
          </Card.Body>
          </Card>
          </Col>
          <Col sm={3}>
          <Card>
          <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot text-hugoob-advanced" }>Tirp additional info </Card.Text>
          </Card.Header>
          <Card.Body className={"text-hugobot"}>
            <Table striped={true} bordered={true} >
              {this.renderSelectedTirp()}
          </Table>
        </Card.Body>
          </Card>
          </Col>
        </Row>
        
        <Row>
          <Col sm={4}>
            <TIRPsPie row={this.state.currentRow}></TIRPsPie>
          </Col>
          <Col sm={8}>
          <TIRPTimeLine row = {this.state.currentRow}></TIRPTimeLine>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TIRPsTable;
