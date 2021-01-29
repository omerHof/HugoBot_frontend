import React, { Component} from "react";
import Chart from "react-google-charts";
import service from "./service.js"
class TIRPTimeLine extends Component {
  state = {
    currTirp: this.props.row,
    times: this.props.row._TIRP__mean_offset_from_first_symbol,
    durationOfFirstInterval: this.props.row._TIRP__mean_of_first_interval,
    symbols: this.props.row._TIRP__symbols,
    timeLineDataSet: [],
  };



  constructor(props) {
    super(props);
  };

  drawTimeLine = (name) => {
    let dataset = [
      [
        { type: 'string', id: 'Term' },
        { type: 'string', id: 'Name' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
      ],
      //['1', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
      //['2', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
      //['3', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)],
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

  render() {
    if (this.props.row._TIRP__symbols!== this.state.symbols){
      this.state.currTirp = this.props.row;
      this.state.times = this.props.row._TIRP__mean_offset_from_first_symbol;
      this.state.durationOfFirstInterval =  this.props.row._TIRP__mean_of_first_interval;
      this.state.symbols =  this.props.row._TIRP__symbols;
      this.state.timeLineDataSet= [];
    }
    this.drawTimeLine();
    return(
<Chart
    
    height={'300px'}
    chartType="Timeline"
    loader={<div>Loading Chart</div>}
    data={this.state.timeLineDataSet}
      
    rootProps={{ 'data-testid': '2' }}
  />
    )
    
  };
}
export default TIRPTimeLine;