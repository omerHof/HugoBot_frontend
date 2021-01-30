import React, { Component } from "react";
import { Card, Form, Table, Button,Container } from "react-bootstrap";
import { Link, HashRouter } from "react-router-dom";

import "../../../../resources/style/colors.css";
import "../../../../resources/style/workflow.css";

class SelectedTIRPTable extends Component {

  state = {
    currentRow:this.props.table
  };
  constructor(props) {
    super(props);
  };

renderSelectedTirp = () => {
  if (this.props.table._TIRP__symbols!== this.state.currentRow._TIRP__symbols){
    this.state.currentRow = this.props.table
  }
  let iter = this.state.currentRow;
  if (this.props.type_of_comp ==="tirp"){
    return this.renderTirpTable(iter)
  }
  else{
    return this.renderDiscTirpTable(iter)
  }
};

renderTirpTable = (iter) =>{
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
}

renderDiscTirpTable = (iter) =>{
  return (
    <Container>
      <thead>
        <tr>
          <th> Metric </th>
          <th> Class1 </th>
          <th> Class0 </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current level</td>
          <td>{iter["_TIRP__tirp_size"]}</td>
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
          <td>
            {(
              (iter["_TIRP__vertical_support_class_1"] /
                window.window.num_of_entities_class_1) *
              100
            ).toFixed(1)}
            %
          </td>
        </tr>
        <tr>
          <td>Mean horizontal_support</td>
          <td>{iter["_TIRP__mean_horizontal_support"]}</td>
          <td>{iter["_TIRP__mean_horizontal_support_class_1"]}</td>
        </tr>
        <tr>
          <td>Mean mean duration</td>
          <td>{iter["_TIRP__mean_duration"]}</td>
          <td>{iter["_TIRP__mean_duration_class_1"]}</td>
        </tr>
        <tr>
          <td>Entities</td>
          <td>{iter["_TIRP__vertical_support"]}</td>
          <td>{iter["_TIRP__vertical_support_class_1"]}</td>
        </tr>
      </tbody>
    </Container>
  );
}

render(){
  return (
  <Card>
  <Card.Header className={"bg-hugobot"}>
    <Card.Text className={"text-hugobot text-hugoob-advanced"}>
      Selected TIRP additional info{" "}
    </Card.Text>
  </Card.Header>
  <Card.Body className={"text-hugobot"}>
    <Table striped={true} bordered={true}>
      {this.renderSelectedTirp()}
    </Table>
  </Card.Body>
</Card>
  )};
}
export default SelectedTIRPTable;