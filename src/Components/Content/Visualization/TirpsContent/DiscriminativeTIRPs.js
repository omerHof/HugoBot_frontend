import React, { Component } from "react";
import DiscTIRPsTable from "./DiscTIRPsTable";
import Container from "react-bootstrap/Container";

class DiscriminativeTIRPs extends Component{
    state = {
        currentLevel: []
    }
    constructor(props) {
        super(props);        
        this.state.currentLevel = window.rootElement;        
    }

    render() {
        return(
            <Container fluid>
                <DiscTIRPsTable
                    table={this.state.currentLevel}
                ></DiscTIRPsTable>
            </Container>
            
        )
    }
}

export default DiscriminativeTIRPs;