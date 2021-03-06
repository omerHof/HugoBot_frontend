import React, { Component } from "react";
import Chart from "react-google-charts";
import {
  ToggleButtonGroup,
  ToggleButton,
  Card,
  Col,
  Row,
} from "react-bootstrap";

class TIRPsPie extends Component {
  state = {
    Pie1_prop: this.props.row._TIRP__supporting_entities_properties,
    pie1_propAsArray: [],
    pie0_prop: [],
    pie0_propAsArray: [],
    idxChoosen: 0,
  };
  constructor(props) {
    super(props);
    if (this.props.row._TIRP__exist_in_class1) {
      this.state.Pie0_prop = this.props.row._TIRP__supporting_entities_properties_class_1;
    }
    this.temp(Object.keys(this.state.Pie1_prop)[0]);
  }

  ToggleButtonPie = () => {
    const radios = Object.keys(this.state.Pie1_prop);
    return (
      <ToggleButtonGroup
        defaultValue={0}
        name="options"
        style={{ width: "100%" }}
      >
        {radios.map((radio, idx) => (
          <ToggleButton
            className={"bg-hugobot"}
            key={idx}
            type="radio"
            color="info"
            name="radio"
            value={idx}
            onChange={(e) => this.temp(radio, idx)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  temp = (name, idx) => {
    this.updatePieValues(name);
    this.state.idxChoosen = idx;
    this.forceUpdate();
  };
  updatePieValues = (name) => {
    if (!name) {
      name = Object.keys(this.state.Pie1_prop)[0];
    }
    let properties = this.state.Pie1_prop[name];
    this.state.pie1_propAsArray = [["Property", "Value"]];

    for (var i = 0; i < properties.length; i++) {
      let b = Object.entries(properties[i]);
      let c = b[0];
      this.state.pie1_propAsArray.push([c[0], parseInt(c[1])]);
    }
    if (this.props.row._TIRP__exist_in_class1) {
      let properties = this.state.Pie0_prop[name];
      this.state.pie0_propAsArray = [["Property", "Value"]];

      for (var i = 0; i < properties.length; i++) {
        let b = Object.entries(properties[i]);
        let c = b[0];
        this.state.pie0_propAsArray.push([c[0], parseInt(c[1])]);
      }
    }
  };

  drawPie = () => {
    let pie_title = "Class 1 - " + window.dataSetInfo.class_name;
    if (this.props.type_of_comp === "tirp") {
      return this.renderTirpPie(
        this.state.pie1_propAsArray,
        pie_title,
        "100%",
        false
      );
    } else {
      let pie0_title = "Class 0 - " + window.dataSetInfo.second_class_name;
      return this.renderDiscTirpPie(pie_title, pie0_title);
    }
  };

  renderTirpPie = (data, pie_title, width, show) => {
    return (
      <Chart
        width={width}
        height={"200px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: "Properties Distribution",
          is3D: true,
          title: pie_title,
          titleTextStyle: {
            fontSize: 20,
            bold: true,
            italic: false,
          },
        }}
      />
    );
  };

  renderDiscTirpPie = (pie_title, pie0_title) => {
    return (
      <Row>
        <Col sm={3} style={{ marginRight: "20%" }}>
          {this.renderTirpPie(
            this.state.pie1_propAsArray,
            pie_title,
            "350px",
            false
          )}
        </Col>
        <Col sm={3} style={{ zIndex: "0" }}>
          {this.renderTirpPie(
            this.state.pie0_propAsArray,
            pie0_title,
            "350px",
            true
          )}
        </Col>
      </Row>
    );
  };

  render() {
    if (
      this.props.row._TIRP__supporting_entities_properties !==
      this.state.Pie1_prop
    ) {
      this.state.Pie1_prop = this.props.row._TIRP__supporting_entities_properties;
      this.state.Pie0_prop = this.props.row._TIRP__supporting_entities_properties_class_1;
      this.updatePieValues(
        Object.keys(this.state.Pie1_prop)[this.state.idxChoosen]
      );
    }

    let that = this;
    window.addEventListener("ReloadTirpTable", function () {
      that.forceUpdate();
    });
    return (
      <div>
        <Card>
          <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot text-hugoob-advanced"}>
              Properties Distribution{" "}
            </Card.Text>
          </Card.Header>
          <Card.Body>
            {this.ToggleButtonPie()}
            {this.drawPie()}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default TIRPsPie;
