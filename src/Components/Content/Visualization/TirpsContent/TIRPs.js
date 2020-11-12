import React, { Component } from "react";
import TIRPsTable from "./TIRPsTable";

class TIRPs extends Component{    
    state = {
        currentLevel: []
    }
    constructor(props) {
        super(props);        
        this.state.currentLevel = window.rootElement;        
        let x = 5;
    }

    render() {
        return(
            <TIRPsTable
            table={this.state.currentLevel}
            ></TIRPsTable>
        )
    }
}

export default TIRPs;