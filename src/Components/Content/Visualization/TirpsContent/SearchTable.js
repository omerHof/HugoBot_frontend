import React, { Component } from "react";

class SearchTable extends Component {
  state = {
    symbols: [],
    relations: [],
    vs: [],
    mhs: [],
    sizes: [],
    mmd: [],
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
  }
  render() {
    return (
      <h4>Table Component</h4>
    )
  }
};

export default SearchTable;