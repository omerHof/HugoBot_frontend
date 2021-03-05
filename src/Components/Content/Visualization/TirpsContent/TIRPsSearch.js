import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchGraph from "./SearchGraph";
import SearchIntervals from "./SearchIntervals";
import SearchLimits from "./SearchLimits";
import SearchMeanPresentation from "./SearchMeanPresentation";
import Axios from "axios";
import cookies from "js-cookie";


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
            maxSize: 10,
            minHS: 1,
            maxHS: 100,
            minVS: 0,
            maxVS: 100
        },
        minMMD: 0,
        maxMMD: 100,
        isAllStartSelected: true,
        isAllContainSelected: true,
        isAllEndSelected: true,

        // parameters for showing results
        showGraph: false,
        finalResults: []

    };

    constructor(props) {
        super(props);
        this.buildStates();
        this.state.parameters.minVS = window.dataSetInfo.min_ver_support * 100;
    }


    buildStates() {
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

            this.state.startList.push(iter.StateID);
            this.state.containList.push(iter.StateID);
            this.state.endList.push(iter.StateID);

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

    changeIsStartAllSelected(ans) {
        this.setState({ isAllStartSelected: ans })
    }

    changeIsContainllSelected(ans) {
        this.setState({ isAllContainSelected: ans })
    }

    changeIsEndAllSelected(ans) {
        this.setState({ isAllEndSelected: ans })
    }

    changeParameter = (event) => {
        let newParameters = this.state.parameters;
        let parameterName = event.target.name;
        let value = parseInt(event.target.value);
        newParameters[parameterName] = value;
        this.setState(
            { parameters: newParameters }
        );
    }

    checkParameters() {
        if (this.state.parameters.minSize < 1)
            this.state.parameters.minSize = 1;
        if (this.state.parameters.maxSize < 1)
            this.state.parameters.maxSize = 1;
        if (this.state.parameters.minHS < 1)
            this.state.parameters.minHS = 1;
        if (this.state.parameters.maxHS < 1)
            this.state.parameters.maxHS = 1;
        if (this.state.parameters.minVS < window.dataSetInfo.min_ver_support * 100)
            this.state.parameters.minVS = window.dataSetInfo.min_ver_support * 100;
        if (this.state.parameters.maxVS < window.dataSetInfo.min_ver_support * 100)
            this.state.parameters.maxVS = window.dataSetInfo.min_ver_support * 100;
    }

    async serachTirps() {
        this.checkParameters();
        const formData = new FormData();
        formData.append("data_set_name", window.selectedDataSet);

        if (this.state.isAllStartSelected)
            formData.append("startsList", []);
        else
            formData.append("startsList", this.state.startList);
        if (this.state.isAllContainSelected)
            formData.append("containList", []);
        else
            formData.append("containList", this.state.containList);
        if (this.state.isAllEndSelected)
            formData.append("endsList", []);
        else
            formData.append("endsList", this.state.endList);

        formData.append("minHS", this.state.parameters.minHS);
        formData.append("maxHS", this.state.parameters.maxHS);
        formData.append("minVS", this.state.parameters.minVS);
        formData.append("maxVS", this.state.parameters.maxVS);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "x-access-token": cookies.get("auth-token"),
            },
        };

        const response = await Axios.post(window.base_url + "/searchTirps", formData, config);
        if (!response.statusText == "OK") {
            throw response;
        }
        let results = response.data['Results'];
        let max_mmd = 0;
        this.setState({ finalResults: [] });
        for (var result in results) {
            let res = results[result].split(',')
            if (parseFloat(res[7]) > max_mmd) {
                max_mmd = parseFloat(res[7]);
            }
            if (this.state.parameters.maxSize != '' && this.state.parameters.maxSize != undefined) {
                if (res[4] >= this.state.parameters.minSize && res[4] <= this.state.parameters.maxSize) {
                    this.state.finalResults.push(res)
                }
            }
            else {
                if (res[4] >= this.state.parameter.minSize) {
                    this.state.finalResults.push(res)
                }
            }

        }

        window.searchFinalResults = this.state.finalResults;
        this.showResults();

    }

    showResults() {
        if (!this.state.showGraph) {
            this.setState({ showGraph: true })
        }
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
                                    isAllSelected={this.state.isAllStartSelected}
                                    changeAllselected={this.changeIsStartAllSelected.bind(this)}
                                    intervals={this.state.dictionary_states}
                                    changeList={this.changeStartList.bind(this)}
                                />
                            </Col>
                            <Col sm={4}>
                                <SearchIntervals
                                    title="Contains"
                                    isAllSelected={this.state.isAllContainSelected}
                                    changeAllselected={this.changeIsContainllSelected.bind(this)}
                                    intervals={this.state.dictionary_states}
                                    changeList={this.changeContainList.bind(this)}
                                />
                            </Col >
                            <Col sm={4}>
                                <SearchIntervals
                                    title="Ends With"
                                    isAllSelected={this.state.isAllEndSelected}
                                    changeAllselected={this.changeIsEndAllSelected.bind(this)}
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
                        {this.state.showGraph ? <SearchGraph
                            minVS={this.state.parameters.minVS} 
                            minHS={this.state.parameters.minHS}
                            minMMD={this.state.minMMD}
                            /> : null}
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