import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, ToggleButton, Card } from "react-bootstrap";
import Chart from "react-google-charts";
import SearchAxisPop from "./SearchAxisPop";


const DiaplayEnum = Object.freeze({ "vhd": 1, "vdh": 2, "hvd": 3, "hdv": 4, "dvh": 5, "dhv": 6 });

class SearchGraph extends Component {

    state = {
        symbols: [],
        relations: [],
        vs: [],
        mhs: [],
        sizes: [],
        mmd: [],
        diaplay: { "vs": 1, "mhs": 2, "mmd": 3 },
        AxisModalShow: false,
    };

    constructor(props) {
        super(props);


        this.extractData()
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

    }

    setModalShow(value) {
        this.state.modalShow = value;
        this.forceUpdate();
    }
    setAxisModalShow(value) {
        this.state.AxisModalShow = value;
        this.forceUpdate();
    }

    changeAxis(vs, mhs, mmd) {
        this.setState({
            display: {
                vs: vs,
                mhs: mhs,
                mmd: mmd
            }
        })
        // this.handleDataPositions();
    }

    handleDataPositions() {
        let data = [];
        // data[0] = Array.from(Array(window.searchFinalResults.length).keys()).map(String)
        data[0] = Array(window.searchFinalResults.length).join(".").split(".");
        data[this.state.diaplay.vs] = this.state.vs;
        data[this.state.diaplay.mhs] = this.state.mhs;
        data[this.state.diaplay.mmd] = this.state.mmd;
        data[4] = this.state.sizes;
        // data[5] = this.state.sizes;
        data = this.transpose(data)
        const titles = ["ID", "VS", "MHS", "MMD", "TIRP Size"]
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
                        hAxis: { baseline: parseInt(this.props.minVS) }
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
                        // render={this.renderTableData}
                        onHide={() => this.setAxisModalShow(false)}
                        onUpdate={this.changeAxis.bind(this)}
                    ></SearchAxisPop>
                    
                </div>
            </div>

        );
    }
}

export default SearchGraph;