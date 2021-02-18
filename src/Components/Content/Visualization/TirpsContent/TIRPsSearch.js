import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchGraph from "./SearchGraph";
import SearchIntervals from "./SearchIntervals";
import SearchLimits from "./SearchLimits";
import SearchMeanPresentation from "./SearchMeanPresentation";
import Axios from "axios";


class TIRPsSearch extends Component {

    state = {
        // states and interval names
        dictionary_states: {},

        //parameters for backend call: search
        startList: [],
        containList: [],
        endList: [],
        parameters:
        {
            minSize: 1,
            maxSize: 1,
            minHS: 1,
            maxHS: 1,
            minVS: window.dataSetInfo.min_ver_support*100,
            maxVS: 100,
        },        
        minMMD: 0,
        maxMMD: 0,

        // parameters for showing results
        finalResults: []

    };

    constructor(props) {
        super(props);
        console.log("constructor")
        // this.updateMinVSvalue();
        this.buildStates();
    }

    // updateMinVSvalue(){       
    //     this.state.parameters.minVS = window.dataSetInfo.min_ver_support*100;         
    // }

    // fills state.states and state.interval_names with windows.states
    buildStates() {
        console.log("buildStates")
        let tables = JSON.parse(window.States);
        tables.States.map((iter, idx) => {
            iter = JSON.parse(iter);
            let name = ""
            let part1 = ""
            let part2 = ""
            if (iter.TemporalPropertyName == undefined) {
                part1 = iter.TemporalPropertyID;
            }
            else {
                part1 = iter.TemporalPropertyName;
            }
            if (iter.BinLabel === undefined) {
                part2 = iter.BinID;
            }
            else {
                part2 = iter.BinLabel;
            }
            name = part1 + "." + part2;
         
            this.state.startList.push(iter.StateID)
            this.state.containList.push(iter.StateID)
            this.state.endList.push(iter.StateID)
            this.state.dictionary_states[iter.StateID] = name;
        });

    }

    //binding with the child "SearchIntervals"
    changeStartList(newList) {
        this.setState({ startList: newList });
    }

    changeContainList(newList) {
        this.setState({ containList: newList });
    }

    changeEndList(newList) {
        this.setState({ endList: newList });
    }

    changeParameter = (event) =>{
        let newParameters = this.state.parameters;
        let parameterName = event.target.name;
        let value = event.target.value;        
        newParameters[parameterName] = value;
        this.setState(
            {parameters: newParameters}
        );
    }


    async serachTirps() {     
        let body = {
            data_set_name: window.selectedDataSet,            
            startsList: this.state.startsList,
            containList: this.state.containList,
            endsList: this.state.endsList,
            minHS: this.state.parameters.minHS,
            minHS: this.state.parameters.maxHS,
            minHS: this.state.parameters.minVS,
            minHS: this.state.parameters.maxVS           
        }
        let add = window.base_url + "searchTirps";
        console.log(add)
        const response = await Axios.post(window.base_url + "/searchTirps", body);
        let results = response.data['Results'];
        let max_mmd = 0;
        this.setState({finalResults: []});
        for (var result in results) {
            let res = results[result].split(',')
            if (parseFloat(res[7]) > max_mmd)
                max_mmd = parseFloat(res[7])
            if (this.state.maxSize != '' && this.state.maxSize != undefined) {
                if (res[4] >= this.state.minSize && res[4] <= this.state.maxSize)
                    this.state.finalResults.push(res)
            }
            else {
                if (res[4] >= this.state.minSize)
                    this.state.finalResults.push(res)
            }
        }

        window.searchFinalResults = this.state.finalResults;
        // self.showResults(max_mmd);
     
    }

    render() {
        // var changeStartList = this.changeStartList;
        return (
            <Container fluid>
                <Row>
                    <Col sm={8}>
                        <Row>
                            <Col sm={4}>
                                <SearchIntervals
                                    title="Start With"
                                    intervals={this.state.dictionary_states}
                                    changeList={this.changeStartList.bind(this)}
                                />
                            </Col>
                            <Col sm={4}>
                                <SearchIntervals
                                    title="Contains"
                                    intervals={this.state.dictionary_states}
                                    changeList={this.changeContainList.bind(this)}
                                />
                            </Col >
                            <Col sm={4}>
                                <SearchIntervals
                                    title="Ends With"
                                    intervals={this.state.dictionary_states}
                                    changeList={this.changeEndList.bind(this)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <SearchLimits 
                            onClick={this.serachTirps.bind(this)}
                            parameters={this.state.parameters}
                            changeParameter={this.changeParameter}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchGraph />
                    </Col>
                    <Col>
                        <SearchMeanPresentation />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TIRPsSearch;