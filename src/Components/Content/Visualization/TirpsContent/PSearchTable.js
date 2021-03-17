import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card,Row, Col, Modal, Button } from "react-bootstrap";


class PSearchTable extends Component {
  state = {
    symbols: [],
    relations: [],
    vs: [],
    mhs: [],
    sizes: [],
    mmd: [],
    data: [],
    state_dictionary: [],
    rowSelectedId:0,
    selected: [],
    location: 0,
    
    measureToAxis: { vs: 1, mhs: 2, mmd: 3 },
    axisToMeasure: { 1: "vs", 2: "mhs", 3: "mmd" },
    measures: {
      vs: "Vertical Support",
      mhs: "Mean Horizontal Support",
      mmd: "Mean Mean Duration",
    },
    minMeasures: {},
    AxisModalShow: false,
  };

  constructor(props) {
    super(props);
    this.init_state_dict();
    this.extractData();
    this.renderTableData();
  }
  render() {
  <h4>PSearch table</h4>
  }
}
export default PSearchTable;