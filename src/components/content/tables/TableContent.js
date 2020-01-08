import React, { Component } from "react";
import { Router, Route} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

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
import { Link} from "react-router-dom";

import InfoCard from "./infoComponents/InfoCard";
import StatsCard from "./infoComponents/StatsCard";
import VMapCard from "./infoComponents/VMapCard";
import AddConfigCard from "./discComponents/AddConfigCard";
import Row from "react-bootstrap/Row";

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
        this.state = {  HomeTable: HomeData
                        }
    }

    CollectData=(id) =>
    {
        this.setState({DiscretizationTable : DiscretizationData ,InfoTable : InfoTable, TIMTable: TIMData});
        //console.log(this.state.TemporalAbstractionTable);
        //alert(id);
        history.push("/Home/Info");
    }

    render() {
        return (
            <Router history={history}>
                <br/>
                <Workflow/>
                <br/>
                <Container>
                    <Route exact={true} path={"/Home"}>
                        <MyHomeTable
                            HomeTable={this.state.HomeTable}
                            CollectData={ this.CollectData}
                        />
                    </Route>
                    <Route path={"/Home/Info"}>
                        <Container fluid={true}>
                            <Row>
                                <Col md={4}>
                                    <InfoCard/>
                                    <StatsCard/>
                                    {/*<Link to={"/Home/Info"}>*/}
                                    {/*    Download Dataset Files*/}
                                    {/*</Link>*/}
                                </Col>
                                <Col md={8}>
                                    <VMapCard/>
                                </Col>
                            </Row>
                        </Container>
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
