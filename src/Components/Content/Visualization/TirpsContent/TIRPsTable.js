import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Card, Form, Table } from "react-bootstrap";
import cookies from "js-cookie";
import Axios from "axios";

import history from "../../../../History";

/**
 * this class contains the display of the the table from table content
 */

class TIRPsTable extends Component {
  state = {
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

  renderTableData = () => {
     
      let tables = this.props.table
      return tables.map((iter, idx) => {
         let x = iter;
         let y = idx;
          return (
            <tr
            //   key={idx.toString()}
            //   onClick={() => {
            //     sessionStorage.setItem("Workflow", "Info");
            //     this.props.CollectData(iter["DatasetName"]);
            //   }}
            >
              {/*<td>{iter["UserID"]}</td>*/}
              <td> {iter["next"]} </td>
              <td> {iter["_TIRP__rel"]} </td>
              <td> {iter["_TIRP__symbols"]} </td>
              <td> {iter["_TIRP__vertical_support"]} </td>
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
    );
  }
}

export default TIRPsTable;