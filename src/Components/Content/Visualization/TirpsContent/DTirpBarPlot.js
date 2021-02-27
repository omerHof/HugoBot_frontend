import React, { Component } from "react";
import Chart from "react-google-charts";
import { ButtonGroup, ToggleButton, Card,Col,Row } from "react-bootstrap";

class DTirpBarPlot extends Component {
  state = {
    rowSymbol:"",
    labelClass0:"",
    labelClass1:"",
    data:"",
    title:"",
    ylabel:""
  };

  constructor(props) {
    super(props);
    this.state.rowSymbol=this.props.row._TIRP__symbols;
    this.temp('MMD');
  }

  temp = (name) => {
    this.updateBarValues(name);
    this.forceUpdate();
  };
  updateBarValues= (name) =>{
    let currTirp = this.props.row
    let numOfEntities = window.window.num_of_entities;
    let numOfEntitiesClass1 =  window.window.num_of_entities_class_1;
    
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
      let x=5;
    }else if(name==="MMD"){
      let MMD0 = currTirp._TIRP__mean_duration;
      let MMD1 = currTirp._TIRP__mean_duration_class_1;
      let min_interval0 = Math.round(currTirp._TIRP__md_confidence_interval_low_class_0 * 100) / 100;
      let max_interval0 = Math.round(currTirp._TIRP__md_confidence_interval_high_class_0 * 100) / 100;
      let min_interval1 = Math.round(currTirp._TIRP__md_confidence_interval_low_class_1 * 100) / 100;
      let max_interval1 = Math.round(currTirp._TIRP__md_confidence_interval_high_class_1 * 100) / 100;
      let min0 = Math.round((MMD0-min_interval0) * 100) / 100
      let max0 = Math.round((MMD0+max_interval0) * 100) / 100
      let min1 = min_interval1
      let max1 = max_interval1
      this.state.data=[
        ['Param',this.state.labelClass0,this.state.labelClass1],
        ['Min', min0, min1],
        ['MMD', MMD0, MMD1],
        ['Max', max0, max1],
      ]
    }else{
      let x=5;
    }
  }


  ToggleButtonBar = () => {
    const radios = ['VS','MHS','MMD'];
    const myStyle = {
      width:'100%',
      marginBottom:"3%",
    }
    return (
      <ButtonGroup toggle style={myStyle}>
        {radios.map((radio, idx) => (
          <ToggleButton
            className={"bg-hugobot"}
            key={idx}
            type="checkbox"
            variant="info"
            name="radio"
            value={radio}
            onChange={(e) => this.temp(radio)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>
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
        title: this.state.title,
        vAxis: { title: '' },
        hAxis: { title: this.state.ylabel },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
    )}
    
    
    render() {
      if  (this.state.rowSymbol!=this.props.row._TIRP__symbols){
        this.state.rowSymbol=this.props.row._TIRP__symbols
        this.updateBarValues('MMD')
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