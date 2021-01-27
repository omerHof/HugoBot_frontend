import React, { Component, useState } from "react";
import Chart from "react-google-charts";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";

class TIRPsPie extends Component {
  state = {
    Properties: this.props.row._TIRP__supporting_entities_properties,
    propertiesAsArray: [],
  };
  constructor(props) {
    super(props);
    this.temp(Object.keys(this.state.Properties)[0]);
  }

  ToggleButtonPie = () => {
    // const [radioValue, setRadioValue] = useState("Age");

    const radios = Object.keys(this.state.Properties);
    let x = 5;
    //  [
    //{ name: 'Active', value: '1' },
    //  { name: 'Radio', value: '2' },
    //  { name: 'Radio', value: '3' },
    // ];
    return (
      <>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio}
              // checked={radioValue === radio.value}
              onChange={(e) => this.temp(radio)}
            >
              {radio}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  };

  temp = (name) => {
    this.drawPie(name);
    this.forceUpdate();
  };
  drawPie = (name) => {
    let properties = this.state.Properties[name];
    this.state.propertiesAsArray = [["Property", "Value"]];

    for (var i = 0; i < properties.length; i++) {
      let b = Object.entries(properties[i]);
      let c = b[0];
      this.state.propertiesAsArray.push([c[0], parseInt(c[1])]);
    }
  };

  render() {
    let that = this;
    window.addEventListener("ReloadTirpTable", function () {
      that.forceUpdate();
    });
    return (
      <div key={this.props.row}>
        {this.ToggleButtonPie()}
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={this.state.propertiesAsArray}
          options={{
            title: "My Daily Activities",
            // Just add this option
            is3D: true,
          }}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    );
  }
}

export default TIRPsPie;
