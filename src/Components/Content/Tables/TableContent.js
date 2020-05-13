import React, { Component } from "react";

import {Col, Container, Row} from "react-bootstrap";
import { Router, Route} from "react-router-dom";

import HomeTable from "./HomeTable";
import DiscretizationTable from "./DiscretizationTable";
import TIMTable from "./TIMTable";

import history from "../../../History";

// import HomeData from "./mainTable";
import InfoData from "./infoData";
// import DiscretizationData from "./DiscretizationData";
import TIMData from "./TIMData";
import Info from "./infoComponents/Info"

import Workflow from "./Workflow";

import InfoCard from "./infoComponents/InfoCard";
import StatsCard from "./infoComponents/StatsCard";
import VMapCard from "./infoComponents/VMapCard";
import AddConfigCard from "./discComponents/AddConfigCard";
import Visualization from "./Visualization";
import Axios from "axios";
import cookies from "js-cookie";

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

    getDataOnDataset(id){
        const url = 'http://localhost:80/getDataOnDataset?id='+id;
        const config = {
            headers: {
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }


    constructor(props) {
        super(props);
        if ("allTables" in sessionStorage){

        }
        else{
            this.getAllDatasets()
                .then((response) => {
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

        this.getDataOnDataset(id)
            .then((response) => {
                if (response.status < 400) {
                    let data1= response.data["disc"];
                    let i;
                    let disc= {"rows": []}
                    for (i = 0; i < data1["lengthNum"]; i++) {
                        let y=data1[parseInt(i)];
                        disc.rows.push(y)
                    }
                    let data2= response.data["karma"];
                    let j;
                    let karma= {"rows": []}
                    for (j = 0; j < data2["lengthNum"]; j++) {
                        let w=data2[parseInt(j)];
                        karma.rows.push(w)
                    }
                    sessionStorage.setItem('DiscretizationTable', JSON.stringify(disc));
                    sessionStorage.setItem('TIMTable', JSON.stringify(karma));
                    sessionStorage.setItem('datasetName',id);
                    history.push("/Home/Info");
                    sessionStorage.setItem("dataSet","true");
                    window.dispatchEvent(new Event("ReloadDataSet"));
                    //sessionStorage.setItem("allTables",JSON.stringify(myData));
                    //console.log(JSON.parse(sessionStorage.allTables));
                    //window.dispatchEvent(new Event("ReloadHomeTable"));
                } else {
                    window.alert('uh oh, there\'s a problem!');
                }
            })
            .catch(error => {
                window.alert("hi");
            });
    }

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
    <Info/>
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