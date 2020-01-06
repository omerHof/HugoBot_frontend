import React, { Component } from "react";
import { Router, Route} from "react-router-dom";
import Container from "react-bootstrap/Container";

import MyHomeTable from "./DisplayTableHome";
import InfoTable from "./InfoTable";
import DiscretizationTable from "./DiscretizationTable";
import TIMTable from "./TIMTable";

import history from "./History";

import HomeData from "./mainTable";
import InfoData from "./infoData";
import DiscretizationData from "./DiscretizationData";
import TIMData from "./TIMData";

import Workflow from "./Workflow";

class TableContent extends Component{
    state = {
        HomeTable: [],
        InfoTable: [],
        DiscretizationTable: [],
        TIMTable: []
    };

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {  HomeTable: HomeData,
                        }
    }

    componentWillUnmount(){
        console.log("hey");
    }

    CollectData=(id) =>
    {
        this.setState({DiscretizationTable : DiscretizationData, InfoTable : DiscretizationData, TIMTable: DiscretizationData});
        //console.log(this.state.TemporalAbstractionTable);
        //alert(id);
        history.push("/Home/Disc");
    }

    render() {
        return (
            <Router history={history}>
                <br/>
                <Workflow/>
                <br/>
                <br/>
                <Container>
                    <Route exact={true} path={"/Home"}>
                        <MyHomeTable
                            HomeTable={this.state.HomeTable}
                            CollectData={ this.CollectData}
                        />
                    </Route>
                    <Route path={"/Home/Info"}>
                        <InfoTable
                            InfoTable={this.state.InfoTable}
                        />
                    </Route>
                    <Route path={"/Home/Disc"}>
                        <DiscretizationTable
                            DiscretizationTable={this.state.DiscretizationTable}

                        />
                    </Route>
                    <Route path={"/Home/TIM"}>
                        <TIMTable
                            TIM={this.state.TIMTable}
                        />
                    </Route>
                </Container>
            </Router>
        );
    }
}
export default TableContent;
