import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, Row, Col, Card } from "react-bootstrap";
import Chart from "react-google-charts";
import PsearchAxisPop from "./PsearchAxisPop";
import PsearchMeanPresentation from "./PsearchMeanPresentation";

class PsearchGraph extends Component {
  state = {
    labelClass0: "",
    labelClass1: "",
    symbols: [],
    relations: [],
    vs0: [],
    vs1: [],
    delta_mhs: [],
    sizes: [],
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
    minMeasures: {},
    AxisModalShow: false,
  };

  constructor(props) {
    super(props);
    this.extractData();
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
      this.state.vs0.push(vs0);
      this.state.vs1.push(parseFloat((vs1 * 100).toFixed(0)));
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
  setAxisModalShow(value) {
    this.state.AxisModalShow = value;
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
    data[0] = Array(window.PsearchFinalResults.length).join(".").split(".");
    data[this.state.measureToAxis.vs0] = this.state.vs0;
    data[this.state.measureToAxis.vs1] = this.state.vs1;
    data[this.state.measureToAxis.dmmd] = this.state.delta_mmd;
    data[this.state.measureToAxis.dmhs] = this.state.delta_mhs;

    data = this.transpose(data);

    let titles = [];
    titles[0] = "ID";
    titles[1] = this.state.axisToMeasure[1].toUpperCase();
    titles[2] = this.state.axisToMeasure[2].toUpperCase();
    titles[3] = this.state.axisToMeasure[3].toUpperCase();
    titles[4] = this.state.axisToMeasure[4].toUpperCase();
    data.unshift(titles);

    return data;
  }

  transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  }

  onSelect(chartWrapper) {
    console.log("SELECTED");
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();

    if (selection.length === 1) {
      this.state.location = selection[0].row;
      this.forceUpdate();
    }
  }
  draw_selected_tirp() {
    const location = this.state.location;
    if (location != 0) {
      return (
        <PsearchMeanPresentation
          vs1={this.state.vs1[location]}
          vs0={this.state.vs0[location]}
          mmd={this.state.delta_mmd[location]}
          mhs={this.state.delta_mhs[location]}
          currentLevel={this.state.sizes[location]}
          symbols={this.state.symbols[location]}
          relations={this.state.relations[location]}
        ></PsearchMeanPresentation>
      );
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={9}>
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
                title:
                  window.selectedDataSet +
                  ": " +
                  window.PsearchFinalResults.length +
                  " TIRPs " +
                  //  having >= " +
                  // this.state.minMeasures.vs +
                  // "% Vertical Support " +
                  " \uD83D\uDD35" +
                  " Bubble Color Tone: " +
                  this.state.measures[this.state.axisToMeasure[3]] +
                  " \uD83D\uDD35" +
                  " Bubble Size: " +
                  this.state.measures[this.state.axisToMeasure[4]],
                chartArea: { left: 80 },
                colorAxis: { colors: ["white", "#1150AC"] },
                legend: {
                  position: "right",
                },
                // sizeAxis: { maxSize: 5, minSize: 5 },
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
          <Col sm={2}>{this.draw_selected_tirp()}</Col>
        </Row>

        <Button
          variant="primary"
          style={{ marginRight: "2%" }}
          onClick={() => this.setAxisModalShow(true)}
        >
          Select Axis
        </Button>

        <div className="overlay">
          <PsearchAxisPop
            className="popupWeights"
            show={this.state.AxisModalShow}
            onHide={() => this.setAxisModalShow(false)}
            onUpdate={this.changeAxis.bind(this)}
            axisToMeasure={this.state.axisToMeasure}
            measureToAxis={this.state.measureToAxis}
          ></PsearchAxisPop>
        </div>
      </div>
    );
  }
}

export default PsearchGraph;
