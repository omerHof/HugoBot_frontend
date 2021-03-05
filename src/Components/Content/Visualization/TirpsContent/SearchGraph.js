import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, ToggleButton, Card } from "react-bootstrap";
import Chart from "react-google-charts";
import SearchAxisPop from "./SearchAxisPop";


class SearchGraph extends Component {

    state = {
        symbols: [],
        relations: [],
        vs: [],
        mhs: [],
        sizes: [],
        mmd: [],
        measureToAxis: { "vs": 1, "mhs": 2, "mmd": 3 },
        axisToMeasure: {1: "vs", 2: "mhs", 3: "mmd"},
        measures: {"vs": "Vertical Support", "mhs": "Mean Horizontal Support", "mmd": "Mean Mean Duration"},
        minMeasures:{},
        AxisModalShow: false
    };

    constructor(props) {
        super(props);
        this.extractData();
       

    }

    extractData() {
        for (let result in window.searchFinalResults) {
            let curr_result = window.searchFinalResults[parseInt(result)];
            this.state.symbols.push(curr_result[0]);
            this.state.relations.push(curr_result[1]);
            this.state.vs.push(parseFloat((curr_result[2] / window.num_of_entities * 100).toFixed(0)));
            this.state.mhs.push(parseFloat(curr_result[3]));
            this.state.sizes.push(parseFloat(curr_result[4]));
            this.state.mmd.push(parseFloat(curr_result[7]));
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
        let x=5;
        this.setState({measureToAxis: measureToAxis, axisToMeasure: axisToMeasure })
        let y=6;
    }

    handleDataPositions() {
        let data = [];
        data[0] = Array(window.searchFinalResults.length).join(".").split(".");
        data[this.state.measureToAxis.vs] = this.state.vs;
        data[this.state.measureToAxis.mhs] = this.state.mhs;
        data[this.state.measureToAxis.mmd] = this.state.mmd;
        data[4] = this.state.sizes;
        data = this.transpose(data)

        let titles = [];
        titles[0] = "ID";
        titles[1] = this.state.axisToMeasure[1].toUpperCase();
        titles[2] = this.state.axisToMeasure[2].toUpperCase();
        titles[3] = this.state.axisToMeasure[3].toUpperCase();
        titles[4] = "TIRP Size";
        data.unshift(titles);

        return data;
    }

    transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    render() {
        return (
            <div>
                <Chart
                    width={'1200px'}
                    height={'600px'}
                    chartType="BubbleChart"
                    loader={<div>Loading Chart</div>}
                    data={this.handleDataPositions()}
                    options={{
                        colorAxis: { colors: ['white', 'blue'] },
                        sizeAxis: { maxSize: 5, minSize: 5 },
                        hAxis: {
                             baseline: this.state.minMeasures[this.state.axisToMeasure[1]] ,
                             title: this.state.measures[this.state.axisToMeasure[1]]
                        },
                        vAxis: {
                             title: this.state.measures[this.state.axisToMeasure[2]]
                        },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
                <Button
                    variant="primary" style={{ marginRight: '2%' }}
                    onClick={() => this.setAxisModalShow(true)}
                >
                    Select Axis
                </Button>
                
                <div className="overlay">
                    <SearchAxisPop
                        className="popupWeights"
                        show={this.state.AxisModalShow}                      
                        onHide={() => this.setAxisModalShow(false)}
                        onUpdate={this.changeAxis.bind(this)}
                        axisToMeasure={this.state.axisToMeasure}
                        measureToAxis={this.state.measureToAxis}
                    ></SearchAxisPop>
                    
                </div>
            </div>

        );
    }
}

export default SearchGraph;