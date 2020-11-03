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

    this.getFullEntities(datasetName);
    window.states = [];
  };

  getFullEntities(dataSetName) {
    this.getEntities(dataSetName).then((response) => {
      let table = JSON.stringify(response.data);
      window.Entities = table;
      this.getEntitieskeys();
      this.forceUpdate();
    });
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
