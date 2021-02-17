import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchGraph from "./SearchGraph";
import SearchIntervals from "./SearchIntervals";
import SearchLimits from "./SearchLimits";
import SearchMeanPresentation from "./SearchMeanPresentation";

class TIRPsSearch extends Component {

    state = {
        states: [],
        interval_names: []
    };

    constructor(props){
        super(props);
        console.log("constructor")
        this.buildStates();
        var x=7;
    }

    // fills state.states and state.interval_names with windows.states
    buildStates(){
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
            let state =
            {
                id: iter.StateID,
                name: name,
                isStartsChecked: true,
                isContainsChecked: true,
                isEndsChecked: true
            }
            this.state.states.push(state)
            this.state.interval_names.push(name); 
            // this.state.dictionary_states.push({[iter.StateID] = name}); 
        });           
       
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={3.3}>
                        <SearchIntervals title="Start With" intervals={this.state.interval_names}/>
                    </Col>
                    <Col sm={3.3}>
                        <SearchIntervals title="Contains" intervals={this.state.interval_names}/>
                    </Col >
                    <Col sm={3.3}>
                        <SearchIntervals title="Ends With" intervals={this.state.interval_names}/>
                    </Col>                    
                    <Col sm={2}>
                        <SearchLimits/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchGraph/>
                    </Col>
                    <Col>
                        <SearchMeanPresentation/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TIRPsSearch;