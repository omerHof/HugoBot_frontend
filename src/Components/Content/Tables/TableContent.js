import React, { Component } from "react";

import { Container } from "react-bootstrap";
import { HashRouter, Route } from "react-router-dom";

import Axios from "axios";
import cookies from "js-cookie";

import AddConfigCard from "./discComponents/AddConfigCard";
import ClassifiersSelection from "../Integration/ClassifiersSelection";
import DiscretizationTable from "./DiscretizationTable";
import history from "../../../History";
import HomeTable from "./HomeTable";
import HomeTableReady from "./HomeTableReady";
import Landing from "./Landing";
import Info from "./infoComponents/Info";
import TirpsApp from "../Visualization/TirpsApp";
import RunKarmaLego from "../Integration/RunKarmaLego";
import TIMTable from "./TIMTable";
import Visualization from "./Visualization";
import Workflow from "./Workflow";


/**
 * this class renders all the data of the home page.
 * it creates the main table witch contains dataset name,
 * category, description, is it public or private, dataset source.
 */

class TableContent extends Component {
  state = {
    HomeTable: [],
    //yiftah
    HomeTableReady: [],
    InfoTable: [],
    DiscretizationTable: [],
    TIMTable: [],
    isNewData: false,
    isDataDisplaeyd: false
  };

  constructor(props) {
    super(props);
    // i changed here the condition , was ! before all the condition
    if (
      ("allTables" in sessionStorage) ||
      ("datasetUploaded" in sessionStorage &&
        sessionStorage.getItem("datasetUploaded") === "true")
    ) {
      this.getAllDatasets().then((response) => {
        console.log("here");
        if (response.status < 400) {
          let data1 = response.data;
          let i;
          let myData = { rows: [] };
          for (i = 0; i < data1["lengthNum"]; i++) {
            let y = data1[parseInt(i)];
            myData.rows.push(y);
          }
          // console.log(myData);
          sessionStorage.setItem("allTables", JSON.stringify(myData));
          // console.log(JSON.parse(sessionStorage.allTables));
          window.dispatchEvent(new Event("ReloadHomeTable"));
          sessionStorage.setItem("datasetUploaded", "false");
        } else {
          window.alert("uh oh, there's a problem!");
        }
      });
      //yiftah
      this.getAllReadyDatasets().then((response) => {
        if (response.status < 400) {
          // console.log(response.data);
          let tempData = response.data.DataSets;
          let j;
          let myData2 = { rows: [] };
          for (j = 0; j < tempData.length; j++) {
            let x = tempData[parseInt(j)];
            myData2.rows.push(x);
          }
          sessionStorage.setItem("allReadyTables", JSON.stringify(myData2));
          // console.log(JSON.parse(sessionStorage.allReadyTables));
          window.dispatchEvent(new Event("ReloadHomeTableReady"));
          sessionStorage.setItem("datasetUploaded", "false");
          // console.log(myData2);
        } else {
          window.alert("uh oh, there's a problem!!!");
        }
      });
    }
  }

  getAllDatasets() {
    const url = window.base_url + "/getAllDataSets";
    return Axios.get(url);
  }

  //yiftah
  getAllReadyDatasets() {
    const url = window.base_url + "/getDataSets";
    return Axios.get(url);
  }

  getDataOnDataset(id) {
    const url = window.base_url + "/getDataOnDataset?id=" + id;
    const config = {
      headers: {
        "x-access-token": cookies.get("auth-token"),
      },
    };
    return Axios.get(url, config);
  }

  
  //yiftah
  StartVisualization = (id) => {
    sessionStorage.setItem("datasetReadyName", id);
    window.open("#/TirpsApp", "_self");
  };

  CollectData = (id) => {
    this.getDataOnDataset(id)
      .then((response) => {
        if (response.status < 400) {
          let data1 = response.data["disc"];
          let i;
          let disc = { rows: [] };
          for (i = 0; i < data1["lengthNum"]; i++) {
            let y = data1[parseInt(i)];
            disc.rows.push(y);
          }
          let data2 = response.data["karma"];
          let j;
          let karma = { rows: [] };
          for (j = 0; j < data2["lengthNum"]; j++) {
            let w = data2[parseInt(j)];
            karma.rows.push(w);
          }
          sessionStorage.setItem("DiscretizationTable", JSON.stringify(disc));
          sessionStorage.setItem("TIMTable", JSON.stringify(karma));
          sessionStorage.setItem("datasetName", id);
          window.open("#/Home/Info", "_self");
          sessionStorage.setItem("dataSet", "true");
          window.dispatchEvent(new Event("ReloadDataSet"));
          //sessionStorage.setItem("allTables",JSON.stringify(myData));
          //console.log(JSON.parse(sessionStorage.allTables));
          //window.dispatchEvent(new Event("ReloadHomeTable"));
        } else {
          window.alert("uh oh, there's a problem!");
        }
      })
      .catch((error) => {
        window.alert(error.response.data["message"]);
      });
  };

  DisplayNewData = () => {
    this.setState({isNewData : true, isDataDisplaeyd: true});   
  }

  DisplayoldData = () => {
    this.setState({isNewData : false, isDataDisplaeyd: true});   
  }

  render() {
    let that = this;
    window.addEventListener("ReloadTableContent", function () {
      that.forceUpdate();
      
    })
    const isNewData = this.state.isNewData;
    const isDiaplaeyd = this.state.isDataDisplaeyd;
      let displaesData;
      if (!isNewData & isDiaplaeyd) {
        displaesData = <HomeTableReady
        HomeTable={this.state.HomeTableReady}
        StartVisualization={this.StartVisualization}
        />;
      }     
      if (isNewData & isDiaplaeyd){
        displaesData = <HomeTable
          HomeTable={this.state.HomeTable}
          CollectData={this.CollectData}
        />;
        
      }
    ;
    return (
      <HashRouter>
        <br />
        <Workflow />
        <br />
        <Container>
          <Route exact={true} path={"/Home"}>
            <Landing new={this.DisplayNewData} old={this.DisplayoldData} />
            {displaesData}
        
          </Route>
          <Route path={"/Home/Info"}>
            <Info />
          </Route>
          <Route path={"/TirpsApp"}>
            <TirpsApp />
          </Route>
          <Route path={"/Home/Disc"}>
            <AddConfigCard />
            <DiscretizationTable />
          </Route>
          <Route path={"/Home/KarmaLego"}>
            <RunKarmaLego />
          </Route>
          <Route path={"/Home/Classifiers"}>
            <ClassifiersSelection />
          </Route>
          <Route path={"/Home/TIM"}>
            <TIMTable />
          </Route>
          <Route path={"/Home/Visualization"}>
            <Visualization />
          </Route>
        </Container>
      </HashRouter>
    );
  }
}
export default TableContent;
