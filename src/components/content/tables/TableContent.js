import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Container from "react-bootstrap/Container";

import MyHomeTable from "./DisplayTableHome";
import InfoTable from "./InfoTable";
import DiscretizationTable from "./DiscretizationTable";
import TIMTable from "./TIMTable";

import HomeData from "./mainTable";
import InfoData from "./infoData";
import DiscretizationData from "./DiscretizationData";
import TIMData from "./TIMData";

import Workflow from "./Workflow";

import InfoCard from "./infoComponents/InfoCard";
import StatsCard from "./infoComponents/StatsCard";
import VMapCard from "./infoComponents/VMapCard";

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
                        InfoTable: HomeData,
                        DiscretizationTable: HomeData,
                        TIMTable: HomeData};
    }

    CollectData=(id) =>
    {
        this.setState({InfoTable : InfoData});
        this.setState({DiscretizationTable : DiscretizationData});
        this.setState({TIMTable : TIMData});
        //console.log(this.state.TemporalAbstractionTable);
        //alert(id);
        window.location.href='/Home/Info';
    }

    render() {
        return (
            <Router>
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
                        {/*<InfoCard/>*/}
                        <VMapCard/>
                        {/*<InfoTable*/}
                        {/*    InfoTable={this.state.InfoTable}*/}
                        {/*/>*/}
                    </Route>
                    <Route path={"/Home/Disc"}>
                        <DiscretizationTable
                            DiscretizationTable={this.state.DiscretizationTable}
                        />
                    </Route>
                    <Route path={"/Home/TIM"}>
                        <TIMTable
                            TIMTable={this.state.TIMTable}
                        />
                    </Route>
                </Container>
            </Router>
        );
    }
}
export default TableContent;