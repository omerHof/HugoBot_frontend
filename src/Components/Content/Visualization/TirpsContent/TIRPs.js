import React, { Component } from "react";
import TIRPsTable from "./TIRPsTable";
import Container from "react-bootstrap/Container";
class TIRPs extends Component{    
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
                <TIRPsTable
                    table={this.state.currentLevel}
                ></TIRPsTable>
            </Container>
            
        )
    }
}

export default TIRPs;