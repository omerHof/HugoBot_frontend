import React, {useRef, useState} from 'react';
import './TIRPTimeLine.css';
import { Card } from "react-bootstrap";
import Chart from "react-google-charts";


const TIRPTimeLine = (props) => {

    const ready = useRef(false);
    const tirp = props.tirp;
    const mean_first_interval = tirp.get_mean_of_first_interval();
    const array_offsets = tirp.get_mean_offset_from_first_symbol();
    let dataArray = [['symbol', 'start', 'end']];
    for(var i=0; i<array_offsets.length-2; i+=2){
        dataArray.push([""+i,array_offsets[i]+mean_first_interval,
                        array_offsets[i+1]+mean_first_interval]);
    }
    ready.current = true;
    console.log(dataArray);

    return (
        <div className="TIRPTimeLine">
            {ready.current?
            <Chart
                chartType="Timeline"
                loader={<div>Loading Chart</div>}
                data={
                    dataArray
                }
                options={{
                    showRowNumber: true,
                }}
                rootProps={{ 'data-testid': '1' }}
                />
            :null}
        </div>
    );
  }
  
  export default TIRPTimeLine;