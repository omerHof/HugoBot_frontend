import React, { Component} from "react";
import Chart from "react-google-charts";
import ButtonGroup from "react-bootstrap/ButtonGroup";
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
    const radios = Object.keys(this.state.Properties);
    return (
      <>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton className={"bg-hugobot"}
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio}
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
    if (this.props.row._TIRP__supporting_entities_properties!== this.state.Properties){
      this.state.Properties = this.props.row._TIRP__supporting_entities_properties
      this.drawPie(Object.keys(this.state.Properties)[0])
    }
    
    let that = this;
    window.addEventListener("ReloadTirpTable", function () {
      that.forceUpdate();
    });
    return (
      <div >
        {this.ToggleButtonPie()}
        <Chart 
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={this.state.propertiesAsArray}
          options={{
            title: "Properties Distribution",
            is3D: true,
          }}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    );
  }
}

export default TIRPsPie;
