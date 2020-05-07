import React, { Component } from "react";

import {Container} from "react-bootstrap";
import { Router, Route} from "react-router-dom";

import HomeTable from "./HomeTable";
import DiscretizationTable from "./DiscretizationTable";
import TIMTable from "./TIMTable";

import history from "../../../History";

import InfoData from "./infoData";
import TIMData from "./TIMData";
import Workflow from "./Workflow";

import AddConfigCard from "./discComponents/AddConfigCard";
import Info from "./infoComponents/Info";
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

    getDataOnDataset(id){
        const url = 'http://localhost:80/getDataOnDataset?id='+id;
        return Axios.get(url);
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
                    console.log(karma)
                    sessionStorage.setItem('TIMTable', JSON.stringify(karma));
                    //sessionStorage.setItem("allTables",JSON.stringify(myData));
                    //console.log(JSON.parse(sessionStorage.allTables));
                    //window.dispatchEvent(new Event("ReloadHomeTable"));
                } else {
                    window.alert('uh oh, there\'s a problem!');
                }
            });





        sessionStorage.setItem('datasetName',id);
        sessionStorage.setItem('TIMTable', JSON.stringify(TIMData));
        sessionStorage.setItem('InfoTable', JSON.stringify(InfoData));
        history.push("/Home/Info");
        sessionStorage.setItem("dataSet","true");
        window.dispatchEvent(new Event("ReloadDataSet"));
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
                        <Info
                        />
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
