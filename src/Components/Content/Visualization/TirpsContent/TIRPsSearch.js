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
        // states and interval names
        states: [],
        dictionary_states: {},

        //parameters for backend call
        startList: [],
        containList: [],
        endList: [],
        minSize: 0,
        maxSize: 0,
        minHS: 0,
        maxHS: 0,
        minVS: 0,
        maxVS: 0,
        minMMD: 0,
        maxMMD:0
    };

    constructor(props){
        super(props);
        console.log("constructor")
        this.buildStates();
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
            this.state.startList.push(iter.StateID)
            this.state.containList.push(iter.StateID)
            this.state.endList.push(iter.StateID)
            this.state.dictionary_states[iter.StateID] = name; 
        });           
       
    }

    changeStartList(newList){
        this.setState( { startList: newList });
    }

    changeContainList(newList){
        this.setState( { containList: newList });
    }

    changeEndList(newList){
        this.setState( { endList: newList });
    }

    
    serachTirps(){

    }

    render() {
        // var changeStartList = this.changeStartList;
        return (
            <Container fluid>
                <Row>
                  <Col sm={8}>
                       <Row>
                            <Col sm={4}>
                                <SearchIntervals    title="Start With" 
                                                    intervals={this.state.dictionary_states} 
                                                    changeList={this.changeStartList.bind(this)} 
                                />
                            </Col>
                            <Col sm={4}>
                                <SearchIntervals    title="Contains"
                                                    intervals={this.state.dictionary_states}
                                                    changeList={this.changeContainList.bind(this)} 
                                />
                            </Col >
                            <Col sm={4}>
                                <SearchIntervals    title="Ends With" 
                                                    intervals={this.state.dictionary_states} 
                                                    changeList={this.changeEndList.bind(this)}    
                                />
                            </Col> 
                       </Row>                   
                  </Col>
                    <Col sm={4}>
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