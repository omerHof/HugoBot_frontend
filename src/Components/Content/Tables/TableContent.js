import React, { Component } from "react";

import {Col, Container, Row} from "react-bootstrap";
import { Router, Route} from "react-router-dom";

import HomeTable from "./HomeTable";
import DiscretizationTable from "./DiscretizationTable";
import TIMTable from "./TIMTable";

import history from "../../../History";

// import HomeData from "./mainTable";
import InfoData from "./infoData";
import DiscretizationData from "./DiscretizationData";
import TIMData from "./TIMData";

import Workflow from "./Workflow";

import InfoCard from "./infoComponents/InfoCard";
import StatsCard from "./infoComponents/StatsCard";
import VMapCard from "./infoComponents/VMapCard";
import AddConfigCard from "./discComponents/AddConfigCard";
import Visualization from "./Visualization";
import Axios from "axios";

class TableContent extends Component{
    state = {
        HomeTable: [],
        InfoTable: [],
        DiscretizationTable: [],
        TIMTable: []
    };

     getAllDatasets(){
        const url = 'http://localhost:80/getAllDataSets';
        return Axios.get(url);
    }

    constructor(props) {
        super(props);
        if ("allTables" in sessionStorage){

        }
        else{
            this.getAllDatasets()
                .then((response) => {
                    window.alert('uh oh, there\'s a problem!');
                    if (response.status < 400) {
                        let data1= response.data;
                        let i;
                        let myData= {"rows": []}
                        for (i = 0; i < data1["lengthNum"]; i++) {
                            let y=data1[parseInt(i)];
                            myData.rows.push(y)
                        }
                      console.log(myData);
                      sessionStorage.setItem("allTables",JSON.stringify(myData));
                      console.log(JSON.parse(sessionStorage.allTables));
                      window.dispatchEvent(new Event("ReloadHomeTable"));
                    } else {
                        window.alert('uh oh, there\'s a problem!');
                    }
                });
        }
    }
    CollectData = (id) =>
    {
        sessionStorage.setItem('datasetName',id);
        sessionStorage.setItem('DiscretizationTable', JSON.stringify(DiscretizationData));
        sessionStorage.setItem('TIMTable', JSON.stringify(TIMData));
        sessionStorage.setItem('InfoTable', JSON.stringify(InfoData));
        history.push("/Home/Info");
        sessionStorage.setItem("dataSet","true");
        window.dispatchEvent(new Event("ReloadDataSet"));
    }

    //<editor-fold desc="Sub-Components">
    Info = (
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
    );
    //</editor-fold>

    render() {
        return (
            <Router history={history}>
                <br/>
                <Workflow/>
                <br/>
                <Container>
                    <Route exact={true} path={"/Home"}>
                        <HomeTable
                            HomeTable={this.state.HomeTable}
                            CollectData={ this.CollectData}
                        />
                    </Route>
                    <Route path={"/Home/Info"}>
                        {this.Info}
                    </Route>
                    <Route path={"/Home/Disc"}>
                        <AddConfigCard/>
                        <DiscretizationTable/>
                    </Route>
                    <Route path={"/Home/TIM"}>
                        <TIMTable/>
                    </Route>
                    <Route path={"/Home/Visualization"}>
                        <Visualization/>
                    </Route>
                </Container>
            </Router>
        );
    }
}
export default TableContent;
