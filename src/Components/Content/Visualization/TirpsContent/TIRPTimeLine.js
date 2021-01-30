import React, { Component} from "react";
import Chart from "react-google-charts";
import { Card} from "react-bootstrap";
import service from "./service.js"
class TIRPTimeLine extends Component {
  state = {
    currTirp: this.props.row,
    times: this.props.row._TIRP__mean_offset_from_first_symbol,
    timesClass1:[],
    durationOfFirstInterval: this.props.row._TIRP__mean_of_first_interval,
    durationOfFirstIntervalClass1:[],
    symbols: this.props.row._TIRP__symbols,

    timeLineDataSet: [],
  };
  constructor(props) {
    super(props);
    if (this.props.type_of_comp ==="disc"){
      this.state.durationOfFirstIntervalClass1 = this.state.currTirp._TIRP__mean_of_first_interval_class_1;
      this.state.timesClass1 = this.state.currTirp._TIRP__mean_offset_from_first_symbol_class_1;
    } 
  };

  drawTimeLine = () => {
    let dataset = [
      [
        { type: 'string', id: 'Term' },
        { type: 'string', id: 'Name' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
      ],
      
    ]
    let data = [];
    let interval = new Array();
    // insert m.duration of first interval
    interval.push(this.state.symbols[0]);
    let date1 = service.getDateForSymbol(0);
    let date2 = service.getDateForSymbol(this.state.durationOfFirstInterval);
    interval.push(this.state.symbols[0] + " - " + service.getDiffBetweenDates(date1, date2));
    interval.push(date1);
    interval.push(date2);
    data.push(interval);
    
    var j = 2;
    var offset = this.state.durationOfFirstInterval;
    for (var i = 1; i < this.state.symbols.length; i++) {
        interval = new Array();
        interval.push(this.state.symbols[i]);
        date1 = service.getDateForSymbol(offset + this.state.times[j]);
        date2 = service.getDateForSymbol(offset + this.state.times[j + 1]);
        interval.push(this.state.symbols[i] + " - " + service.getDiffBetweenDates(date1, date2));
        interval.push(date1);
        interval.push(date2);
        data.push(interval);
        j += 2;
    }
    for (var i = 0; i<data.length;i++){
      dataset.push(data[i]);
    }
    this.state.timeLineDataSet = dataset;
  }

  drawTimeLineForDisc= () => {
    let dataset = [
      [
        { type: 'string', id: 'Term' },
        { type: 'string', id: 'Name' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
      ],
      
    ]
    let data = [];
    let interval = new Array();
    // insert m.duration of first interval
    interval.push(this.state.symbols[0]);
    let date1 = service.getDateForSymbol(0);
    let date2 = service.getDateForSymbol(this.state.durationOfFirstInterval);

    let duration = service.getDiffBetweenDates(date1,date2,true)
    if (!this.state.currTirp._TIRP__exist_in_class0){
        duration = "0 " +  " / " + duration + " " + window.dataSetInfo.timestamp
    }
    else if (this.state.currTirp._TIRP__exist_in_class1 ){
        let date1Class1 = date1;
        let date2Class1 = service.getDateForSymbol(this.state.durationOfFirstIntervalClass1);
        duration += " / " + service.getDiffBetweenDates(date1Class1,date2Class1)
    }else{
        duration += " / 0 " + window.dataSetInfo.timestamp
    }
    interval.push(this.state.symbols[0] + " - " + duration);
    interval.push(date1);
    interval.push(date2);
    data.push(interval);
    var j = 2;
    var offset = this.state.durationOfFirstInterval;
    var offsetClass1 = this.state.durationOfFirstIntervalClass1;
    for (var i = 1; i < this.state.symbols.length; i++) {
        interval = new Array();
        interval.push(this.state.symbols[i]);
        date1 = service.getDateForSymbol(offset + this.state.times[j]);
        date2 = service.getDateForSymbol(offset + this.state.times[j + 1]);
        duration = service.getDiffBetweenDates(date1,date2, true);
        if (!this.state.currTirp._TIRP__exist_in_class0)
        {
            duration = "0 " +  " / " + duration + " " + window.dataSetInfo.timestamp
        }
        else if (this.state.currTirp._TIRP__exist_in_class1 )
        {
            let date1Class1 = service.getDateForSymbol(offsetClass1 + this.state.timesClass1[j]);
            let date2Class1 = service.getDateForSymbol(offsetClass1 + this.state.timesClass1[j + 1]);
            duration += " / " + service.getDiffBetweenDates(date1Class1,date2Class1)
        }
        else
        {
            duration += " / 0 " + window.dataSetInfo.timestamp
        }
        interval.push(this.state.symbols[i] + " - " + duration);
        interval.push(date1);
        interval.push(date2);
        data.push(interval);
        j += 2;
    }
    for (var i = 0; i<data.length;i++){
      dataset.push(data[i]);
    }
    this.state.timeLineDataSet = dataset;   
  }

  render() {
    if (this.props.row._TIRP__symbols!== this.state.symbols){
      this.state.currTirp = this.props.row;
      this.state.times = this.props.row._TIRP__mean_offset_from_first_symbol;
      this.state.durationOfFirstInterval =  this.props.row._TIRP__mean_of_first_interval;
      this.state.symbols =  this.props.row._TIRP__symbols;
      this.state.timeLineDataSet= [];
      if (this.props.type_of_comp ==="disc"){
        this.state.durationOfFirstIntervalClass1 = this.state.currTirp._TIRP__mean_of_first_interval_class_1;
        this.state.timesClass1 = this.state.currTirp._TIRP__mean_offset_from_first_symbol_class_1;
      } 
    }
    if (this.props.type_of_comp ==="disc"){
      this.drawTimeLineForDisc();
    }else{
      this.drawTimeLine();
    }
    return(
      <div>
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>
            Mean Presentation{" "}
          </Card.Text>
        </Card.Header>
        <Card.Body>
        <Chart
          height={'200px'}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={this.state.timeLineDataSet}
          rootProps={{ 'data-testid': '2' }}
          />
        </Card.Body>
      </Card>
      </div>
    )
  };
}
export default TIRPTimeLine;