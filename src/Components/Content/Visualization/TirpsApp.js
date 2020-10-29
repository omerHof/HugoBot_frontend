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
    if ("datasetReadyName" in sessionStorage) {
      this.getEntities(sessionStorage.getItem("datasetReadyName")).then(
        (response) => {
          let table = JSON.stringify(response.data);
          sessionStorage.setItem("Entities", table);
          window.Entities = table;
          console.log(window.Entities);
          // window.dispatchEvent(new Event("ReloadEntitiesTable"));

          console.log("1");
          this.forceUpdate();
        }
      );
    }
  }

  async getEntities(datasetName) {
    const url = window.base_url + "/getEntities";
    const formData = new FormData();
    // formData.append("file", file);
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
