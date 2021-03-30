import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, Row, Col, Card } from "react-bootstrap";
import Chart from "react-google-charts";
import SearchAxisPop from "./SearchAxisPop";
import SearchMeanPresentation from "./SearchMeanPresentation";

class SearchGraph extends Component {
  state = {
    symbols: [],
    relations: [],
    vs: [],
    mhs: [],
    sizes: [],
    mmd: [],
    // location: 0,
    measureToAxis: { vs: 1, mhs: 2, mmd: 3 },
    axisToMeasure: { 1: "vs", 2: "mhs", 3: "mmd" },
    measures: {
      vs: "Vertical Support",
      mhs: "Mean Horizontal Support",
      mmd: "Mean Mean Duration",
    },
    minMeasures: {} 
  };

  constructor(props) {
    super(props);
    if (props.showResult) {
      this.extractData();
    }
  }

  componentDidUpdate() {
    if (this.props.showResult) {
      this.extractData();
    }
  }

  extractData() {
    // extract the results from the backend
    this.state.symbols = [];
    this.state.relations = [];
    this.state.vs = [];
    this.state.mhs = [];
    this.state.sizes = [];
    this.state.mmd = [];

    for (let result in window.searchFinalResults) {
      let curr_result = window.searchFinalResults[parseInt(result)]; //check here fot more details
      this.state.symbols.push(curr_result[0]);
      this.state.relations.push(curr_result[1]);
      this.state.vs.push(
        parseFloat(((curr_result[2] / window.num_of_entities) * 100).toFixed(0))
      );
      this.state.mhs.push(parseFloat(curr_result[3]));
      this.state.sizes.push(parseFloat(curr_result[4]));
      this.state.mmd.push(parseFloat(curr_result[7]));
    }
    this.state.minMeasures.vs = this.props.minVS;
    this.state.minMeasures.hs = this.props.minHS;
    this.state.minMeasures.mmd = this.props.minMMD;
  }


  changeAxis(measureToAxis, axisToMeasure) {
    this.setState({
      measureToAxis: measureToAxis,
      axisToMeasure: axisToMeasure,
    });
  }

  handleDataPositions() {
    // arange the display of results from the backend
    let data = [];
    if (this.props.showResult) {
      data[0] = Array(window.searchFinalResults.length).join(".").split(".");
      data[this.state.measureToAxis.vs] = this.state.vs;
      data[this.state.measureToAxis.mhs] = this.state.mhs;
      data[this.state.measureToAxis.mmd] = this.state.mmd;
      data[4] = this.state.sizes;
      data = this.transpose(data);
    }
    else {
      data[0] = [null];
      data[this.state.measureToAxis.vs] = [0];
      data[this.state.measureToAxis.mhs] = [0];
      data[this.state.measureToAxis.mmd] = [0];
      data = this.transpose(data);
    }


    let titles = [];
    if (this.props.showResult) {
      titles[0] = "ID";
      titles[1] = this.state.axisToMeasure[1].toUpperCase();
      titles[2] = this.state.axisToMeasure[2].toUpperCase();
      titles[3] = this.state.axisToMeasure[3].toUpperCase();
      titles[4] = "TIRP Size";
    }
    else {
      titles[0] = "";
      titles[1] = "";
      titles[2] = "";
      titles[3] = "";
    }

    data.unshift(titles);
    return data;
  }

  transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  }

  onSelect(chartWrapper) {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    let selected = [];
    if (selection.length === 1) {
      const location = selection[0].row;
      selected = [
        this.state.vs[location],
        this.state.mhs[location],
        this.state.mmd[location],
        this.state.sizes[location],
        this.state.symbols[location],
        this.state.relations[location]
      ];
    }
    this.props.handleOnSelect(selected)
  }

  render() {
    return (
      <div>
        <Row>
          <Col >
            <Chart
              // width={'110%'}
              height={"400px"}
              chartType="BubbleChart"
              chartEvents={[
                {
                  eventName: "select",
                  callback: ({ chartWrapper }) => {
                    this.onSelect(chartWrapper);
                  },
                },
              ]}
              loader={<div>Loading Chart</div>}
              data={this.handleDataPositions()}
              options={{
                bubble: {
                  opacity: this.props.showResult ? 0.8 : 0
                },                
                chartArea: { left: 80, top: 10, width:'85%',height:'75%' },
                colorAxis: {
                  colors: ["white", "blue"]
                  ,
                  legend: {
                    position: "bottom",
                  }
                },

                sizeAxis: { 
                  minSize: this.props.showResult ? 5 : 0 ,
                  maxSize: this.props.showResult ? 5 : 0
                },
                hAxis: {
                  baseline: this.state.minMeasures[this.state.axisToMeasure[1]],
                  title: this.state.measures[this.state.axisToMeasure[1]],
                },
                vAxis: {
                  baseline: this.state.minMeasures[this.state.axisToMeasure[2]],
                  title: this.state.measures[this.state.axisToMeasure[2]],
                },
              }}
              rootProps={{ "data-testid": "2" }}
            ></Chart>

          </Col>
        </Row>
        <Row>
          <Col >
            <SearchAxisPop
              className="popupWeights"
              onUpdate={this.changeAxis.bind(this)}
              axisToMeasure={this.state.axisToMeasure}
              measureToAxis={this.state.measureToAxis}
            ></SearchAxisPop>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchGraph;
