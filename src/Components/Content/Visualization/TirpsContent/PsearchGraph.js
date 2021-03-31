import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, Row, Col, Card } from "react-bootstrap";
import Chart from "react-google-charts";
import PsearchAxisPop from "./PsearchAxisPop";

class PsearchGraph extends Component {
  state = {
    labelClass0: "",
    labelClass1: "",
    symbols: [],
    relations: [],
    vs0: [],
    vs1: [],
    mhs0: [],
    mhs1: [],
    delta_mhs: [],
    sizes: [],
    mmd0: [],
    mmd1: [],
    delta_mmd: [],
    location: 0,
    measureToAxis: { vs0: 1, vs1: 2, dmmd: 3, dmhs: 4 },
    axisToMeasure: { 1: "vs0", 2: "vs1", 3: "dmmd", 4: "dmhs" },
    measures: {
      vs0: "vs0",
      vs1: "vs1",
      dmhs: "Delta M.H.S",
      dmmd: "Delta M.M.D",
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
    this.state.labelClass0 =
      window.name_of_class_0 != "" ? window.name_of_class_0 : "Class 0";
    this.state.labelClass1 =
      window.name_of_class_1 != "" ? window.name_of_class_1 : "Class 1";
    // extract the results from the backend
    for (let result in window.PsearchFinalResults) {
      let curr_result = window.PsearchFinalResults[parseInt(result)]; //check here fot more details
      let exist_in_class_1 = curr_result[15] == "True";
      let exist_in_class_0 = curr_result[16] == "True";
      let vs0 = parseFloat(
        ((curr_result[2] / window.num_of_entities) * 100).toFixed(0)
      );
      let vs1 = parseFloat(curr_result[5]);
      if (!exist_in_class_0) {
        vs0 = window.dataSetInfo.min_ver_support;
        vs1 = curr_result[5] / window.num_of_entities_class_1;
      } else {
        if (exist_in_class_1) {
          vs1 = vs1 / window.num_of_entities_class_1;
        } // only 0
        else {
          vs1 = vs1 * 2;
        }
      }
      this.state.vs1.push(vs0);
      this.state.vs0.push(parseFloat((vs1 * 100).toFixed(0)));
      this.state.mhs0.push(curr_result[6]);
      this.state.mhs1.push(curr_result[3]);
      this.state.mmd0.push(curr_result[8]);
      this.state.mmd1.push(curr_result[7]);
      this.state.symbols.push(curr_result[0]);
      this.state.relations.push(curr_result[1]);
      this.state.delta_mhs.push(
        parseFloat(
          Math.abs(
            parseFloat(curr_result[3]) - parseFloat(curr_result[6])
          ).toFixed(2)
        )
      );
      this.state.delta_mmd.push(
        parseFloat(
          Math.abs(
            parseFloat(curr_result[7]) - parseFloat(curr_result[8])
          ).toFixed(2)
        ) / 100
      );
      this.state.sizes.push(parseFloat(curr_result[4]));
    }
    this.state.minMeasures.vs = this.props.minVS;
    this.state.minMeasures.hs = this.props.minHS;
    this.state.minMeasures.mmd = this.props.minMMD;
  }

  setModalShow(value) {
    this.state.modalShow = value;
    this.forceUpdate();
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
      data[0] = Array(window.PsearchFinalResults.length).join(".").split(".");
      data[this.state.measureToAxis.vs0] = this.state.vs0;
      data[this.state.measureToAxis.vs1] = this.state.vs1;
      data[this.state.measureToAxis.dmmd] = this.state.delta_mmd;
      data[this.state.measureToAxis.dmhs] = this.state.delta_mhs;
      data = this.transpose(data);
    }
    else {
      data[0] = [null];
      data[this.state.measureToAxis.vs0] = [0];
      data[this.state.measureToAxis.vs1] = [0];
      data[this.state.measureToAxis.dmmd] = [0];
      data[this.state.measureToAxis.dmhs] = [0];
      data = this.transpose(data);
    }


    let titles = [];
    if (this.props.showResult) {
      titles[0] = "ID";
      titles[1] = this.state.axisToMeasure[1].toUpperCase();
      titles[2] = this.state.axisToMeasure[2].toUpperCase();
      titles[3] = this.state.axisToMeasure[3].toUpperCase();
      titles[4] = this.state.axisToMeasure[4].toUpperCase();
    }

    else {
      titles[0] = "";
      titles[1] = "";
      titles[2] = "";
      titles[3] = "";
      titles[4] = "";
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
        this.state.vs0[location],
        this.state.vs1[location],
        this.state.mhs0[location],
        this.state.mhs1[location],
        this.state.mmd0[location],
        this.state.mmd1[location],
        this.state.sizes[location],
        this.state.symbols[location],
        this.state.relations[location]
      ];
      this.props.handleOnSelect(selected);
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Chart
              // width={'1200px'}
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
                chartArea: { left: 80, top: 10, width: '85%', height: '75%' },
                colorAxis: {
                  colors: ["blue", "black"],
                  legend: {
                    position: "bottom",
                  }
                },


                sizeAxis: {
                  minSize: this.props.showResult ? 5 : 0,
                  maxSize: this.props.showResult ? 30 : 0
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


        <PsearchAxisPop
          className="popupWeights"
          onUpdate={this.changeAxis.bind(this)}
          axisToMeasure={this.state.axisToMeasure}
          measureToAxis={this.state.measureToAxis}
        ></PsearchAxisPop>

      </div>
    );
  }
}

export default PsearchGraph;
