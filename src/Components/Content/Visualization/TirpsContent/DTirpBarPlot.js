import React, { Component } from "react";
import Chart from "react-google-charts";
import { ToggleButtonGroup, ToggleButton, Card,Col,Row } from "react-bootstrap";

class DTirpBarPlot extends Component {
  state = {
    rowSymbol:"",
    labelClass0:"",
    labelClass1:"",
    data:"",
    title:"",
    ylabel:"",
    idxChoosenBar: 0,
  };

  constructor(props) {
    super(props);
    this.state.rowSymbol=this.props.row._TIRP__symbols;
    this.temp('VS',0);
  }

  temp = (name,idx) => {
    this.updateBarValues(name);
    this.state.idxChoosenBar = idx;
    this.forceUpdate();
  };
  updateBarValues= (name) =>{
    let currTirp = this.props.row
    
    if (window.dataSetInfo.class_name != ''){
      this.state.labelClass0 = window.dataSetInfo.class_name;
    }else{
      this.state.labelClass0 = "Class 1"
    }
    if (window.dataSetInfo.second_class_name != ''){
      this.state.labelClass1 = window.dataSetInfo.second_class_name; 
    }else{
      this.state.labelClass1 = "Class 0"
    }

    if (name==="MHS"){
      let MHS0 = currTirp._TIRP__mean_horizontal_support;
      let MHS1 = currTirp._TIRP__mean_horizontal_support_class_1;
      let min_interval0 = Math.round(currTirp._TIRP__hs_confidence_interval_low_class_0 * 100) / 100;
      let max_interval0 = Math.round(currTirp._TIRP__hs_confidence_interval_high_class_0 * 100) / 100;
      let min1 = Math.round(currTirp._TIRP__hs_confidence_interval_low_class_1 * 100) / 100;
      let max1 = Math.round(currTirp._TIRP__hs_confidence_interval_high_class_1 * 100) / 100;
      let min0 = Math.round((MHS0-min_interval0) * 100) / 100
      let max0 = Math.round((MHS0+max_interval0) * 100) / 100
      
      if(!currTirp._TIRP__exist_in_class0)
      {
          min1 =  Math.round((MHS1-min1)* 100) / 100
          max1 = Math.round((MHS1+max1)* 100) / 100
      }
      this.state.data=[
        ['Mean Horizontal Support',this.state.labelClass0,this.state.labelClass1],
        ['Min', min0, min1],
        ['MHS', MHS0, MHS1],
        ['Max', max0, max1],
      ]

    }else if(name==="MMD"){
      let MMD0 = currTirp._TIRP__mean_duration;
      let MMD1 = currTirp._TIRP__mean_duration_class_1;
      let min_interval0 = Math.round(currTirp._TIRP__md_confidence_interval_low_class_0 * 100) / 100;
      let max_interval0 = Math.round(currTirp._TIRP__md_confidence_interval_high_class_0 * 100) / 100;
      let min1 = Math.round(currTirp._TIRP__md_confidence_interval_low_class_1 * 100) / 100;
      let max1 = Math.round(currTirp._TIRP__md_confidence_interval_high_class_1 * 100) / 100;
      let min0 = Math.round((MMD0-min_interval0) * 100) / 100
      let max0 = Math.round((MMD0+max_interval0) * 100) / 100
      if(!currTirp._TIRP__exist_in_class0){
          min1 =  Math.round((MMD1-min1)* 100) / 100
          max1 = Math.round((MMD1+max1)* 100) / 100
      }
      min0 = Math.max(0,min0)
      min1 = Math.max(0,min1)
      this.state.data=[
        ['Mean Mean Duration',this.state.labelClass0,this.state.labelClass1],
        ['Min', min0, min1],
        ['MMD', MMD0, MMD1],
        ['Max', max0, max1],
      ]
    }else{
      let VS0 = (currTirp._TIRP__vertical_support/window.window.num_of_entities*100);
      let VS1 = (currTirp._TIRP__vertical_support_class_1/window.window.num_of_entities_class_1*100);
      this.state.data=[
        ['',this.state.labelClass0,this.state.labelClass1],
        ['Vertical Support',VS0, VS1],
      ]
    }
  }


  ToggleButtonBar = () => {
    const radios = ['VS','MHS','MMD'];
    const myStyle = {
      width:'100%',
      marginBottom:"3%",
    }
    return (
      <ToggleButtonGroup defaultValue={0} name="options"  style={myStyle}>
        {radios.map((radio, idx) => (
          <ToggleButton
            className={"bg-hugobot"}
            key={idx}
            type="radio"
            color = "info"
            name="radio"
            value={idx}
            onChange={(e) => this.temp(radio,idx)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };



  drawBarPlot = () => {
    return (
      <Chart
      width={'300px'}
      height={'200px'}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={this.state.data}
      options={{
        title: 'Population of Largest U.S. Cities',
        chartArea: { width: '50%' },
        isStacked: true,
        hAxis: {
          title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          title: 'City',
        },
      }}
    />
    )}
    
    
    render() {
      if  (this.state.rowSymbol!=this.props.row._TIRP__symbols){
        this.state.rowSymbol=this.props.row._TIRP__symbols
        this.updateBarValues('VS')
      }
      
      return (
        <div>
          <Card>
            <Card.Header className={"bg-hugobot"}>
              <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                Properties Distribution{" "}
              </Card.Text>
            </Card.Header>
            <Card.Body>
              {this.ToggleButtonBar()}
              {this.drawBarPlot()}
              
            </Card.Body>
          </Card>
        </div>
      );
    };
  }
       
  export default DTirpBarPlot;