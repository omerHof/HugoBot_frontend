import React, { Component } from "react";

import TiprsContent from "./TirpsContent/TirpsContent";
import TirpsNavigation from "./TirpsNavigation";
import Axios from "axios";
import cookies from "js-cookie";

/**
 * root class- every class gets its data from this class
 */

class TirpsApp extends Component {
  constructor(props) {
    super(props);
    let dataSetName = sessionStorage.getItem("datasetReadyName");
    this.initilizeRootScope(dataSetName);
  }

  initilizeRootScope = (datasetName) => {
    window.selectedDataSet = datasetName;
    this.getRoot(datasetName);
    this.getFullEntities(datasetName);
    this.getFullStates(datasetName);
    window.states = [];
  };

  //get root for the TIRPs page
  async getRoot(dataSetName) {
    const formData = new FormData();
    formData.append('data_set_name', dataSetName)
    const url = window.base_url + "/initiateTirps";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    const res = await Axios.post(url, formData, config);
    if (!res.statusText == "OK") {
      throw res;
    }
    else {
      const arrOfRoot = res.data.Root;
      let jsons = [];
      for (let i = 0; i < arrOfRoot.length; i++) {
        let tirp = JSON.parse(arrOfRoot[i]);
        jsons.push(tirp);
      }
      window.rootElement = jsons;   
    }

    // Axios.post(url, formData, config).then((response) => {
    //   if (!response.ok) {
    //     throw response;
    //   }

    //   }

    // }
    // );
  }

  //Entities
  getFullEntities(dataSetName) {
    this.getEntities(dataSetName).then((response) => {
      let table = JSON.stringify(response.data);
      window.Entities = table;
      this.getEntitieskeys();
      this.forceUpdate();
    });
  }

  async getEntities(datasetName) {
    const url = window.base_url + "/getEntities";
    const formData = new FormData();
    formData.append("data_set_name", datasetName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    return Axios.post(url, formData, config);
  }

  getEntitieskeys() {
    let tables = JSON.parse(window.Entities);
    let keys = [];
    tables.Entities.map((iter, idx) => {
      iter = JSON.parse(iter);
      if (keys.length === 0) {
        for (let key in iter) {
          keys.push(key);
        }
      } else {
        window.entitiesKeys = keys;
        return null;
      }
    });
  }

  //States
  getFullStates(dataSetName) {
    this.getOurStates(dataSetName).then((response) => {
      let table = JSON.stringify(response.data);
      window.States = table;
      this.getStatesKeys();
      this.forceUpdate();
    });
  }

  async getOurStates(datasetName) {
    const url = window.base_url + "/getStates";
    const formData = new FormData();
    formData.append("data_set_name", datasetName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    return Axios.post(url, formData, config);
  }

  getStatesKeys() {
    let tables = JSON.parse(window.States);
    let keys = [];
    tables.States.map((iter, idx) => {
      iter = JSON.parse(iter);
      if (keys.length === 0) {
        for (let key in iter) {
          keys.push(key);
        }
      } else {
        window.statesKeys = keys;
        return null;
      }
    });
  }

  render() {
    return (
      <div className="TirpsApp">
        <TirpsNavigation />
        <br />
        <br />
        <br />
        <TiprsContent />
        <br />
      </div>
    );
  }
}

export default TirpsApp;
