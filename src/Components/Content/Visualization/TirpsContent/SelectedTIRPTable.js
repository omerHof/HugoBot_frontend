import React, { Component } from "react";
import { Card, Form, Table, Button, Container } from "react-bootstrap";
import { Link, HashRouter } from "react-router-dom";
import "../../../../resources/style/colors.css";
import "../../../../resources/style/workflow.css";

class SelectedTIRPTable extends Component {
  state = {
    currentRow: this.props.table,
  };
  constructor(props) {
    super(props);
  }

  renderSelectedTirp = () => {
    if (
      this.props.table._TIRP__symbols !== this.state.currentRow._TIRP__symbols
    ) {
      this.state.currentRow = this.props.table;
    }
    let iter = this.state.currentRow;
    if (this.props.type_of_comp === "tirp") {
      return this.renderTirpTable(iter);
    } else {
      return this.renderDiscTirpTable(iter);
    }
  };

  renderTirpTable = (iter) => {
    return (
      <div>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Current level</th>
            <td>{iter["_TIRP__tirp_size"]}</td>
          </tr>
          <tr>
            <th>Vertical support</th>
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
            <th>Mean horizontal_support</th>
            <td>{iter["_TIRP__mean_horizontal_support"]}</td>
          </tr>
          <tr>
            <th>Mean mean duration</th>
            <td>{iter["_TIRP__mean_duration"]}</td>
          </tr>
          <tr>
            <th>Entities</th>
            <td>{iter["_TIRP__vertical_support"]}</td>
          </tr>
        </tbody>
      </div>
    );
  };

  renderDiscTirpTable = (iter) => {
    return (
      <div>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Class1</th>
            <th>Class0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Current level</th>
            <td>{iter["_TIRP__tirp_size"]}</td>
            <td>{iter["_TIRP__tirp_size"]}</td>
          </tr>
          <tr>
            <th>Vertical support</th>
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
            <th>Mean horizontal_support</th>
            <td>{iter["_TIRP__mean_horizontal_support"]}</td>
            <td>{iter["_TIRP__mean_horizontal_support_class_1"]}</td>
          </tr>
          <tr>
            <th>Mean mean duration</th>
            <td>{iter["_TIRP__mean_duration"]}</td>
            <td>{iter["_TIRP__mean_duration_class_1"]}</td>
          </tr>
          <tr>
            <th>Entities</th>
            <td>{iter["_TIRP__vertical_support"]}</td>
            <td>{iter["_TIRP__vertical_support_class_1"]}</td>
          </tr>
        </tbody>
      </div>
    );
  };

  buttonMatrixDisabled = () => {
    if (this.state.currentRow["_TIRP__tirp_size"] < 2) {
      return true;
    }
    return false;
  };

  render() {
    let that = this;
    window.addEventListener("ReloadTirpTable", function () {
      that.forceUpdate();
    });
    return (
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>
            Selected TIRP info{" "}
          </Card.Text>
        </Card.Header>
        <Card.Body className={"text-hugobot"}>
          <div className="vertical-scroll vertical-scroll-advanced">
            <Table responsive={true} striped={true} bordered={true}>
              {this.renderSelectedTirp()}
            </Table>

            {/* <Popup
              trigger={<button> Relations Data</button>}
              position="right center"
              modal
            >
              <div className={"modal"}>Popup content here !!</div>
            </Popup> */}
          </div>
        </Card.Body>
      </Card>
    );
  }
}
export default SelectedTIRPTable;
