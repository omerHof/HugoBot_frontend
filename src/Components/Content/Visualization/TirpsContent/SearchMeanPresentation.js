import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Card, Table, Button } from "react-bootstrap";
import Axios from "axios";
import cookies from "js-cookie";
import { BrowserRouter, HashRouter, Redirect } from "react-router-dom";
import { Router } from "react-router";
import { useHistory } from "react-router";
import history from "../../../../History";

class SearchMeanPresentation extends Component {
  state = {
    redirect: false,
  };

  constructor(props) {
    super(props);
  }
  // 

  findTirp() {   
    const formData = new FormData();
    window.PassedFromSearch = true;
    formData.append("data_set_name", window.selectedDataSet);
    formData.append("symbols", this.props.symbols.replace("(", ""));
    formData.append("relations", this.props.relations);

    this.getPath(formData)
  }

  async getPath(formData) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    const url = window.base_url + "/find_Path_of_tirps";

    const res = await Axios.post(url, formData, config);
    if (!res.statusText == "OK") {
      alert("Something went wrong.\n" + "Please Try Again");
    } else {
      let results = res.data["Path"];
      let path = [];
      for (let i = 0; i < results.length; i++) {
        let tirp = JSON.parse(results[i]);
        path.push(tirp);
      }
      window.pathOfTirps = path;
      this.state.redirect = true;
      this.forceUpdate();
    }

  }


  render() {
    let that = this;
    window.addEventListener("ReloadTirpTable", function () {
      that.forceUpdate();
    });
    const { redirect } = this.state;
    if (redirect) {
      return (
        <HashRouter>
          <Redirect to="/TirpsApp/TIRPs" />
        </HashRouter>
      );
    }
    return (
      <Card className="presentation-card">
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>
            Selected TIRP info
          </Card.Text>
        </Card.Header>
        <Card.Body className={"text-hugobot"}>
          <Table responsive={true} striped={true} bordered={true}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Total levels</th>
                <td>{this.props.currentLevel}</td>
              </tr>
              <tr>
                <th>Vertical support</th>
                <td>{this.props.vs}</td>
              </tr>
              <tr>
                <th>Mean horizontal_support</th>
                <td>{this.props.mhs}</td>
              </tr>
              <tr>
                <th>Mean mean duration</th>
                <td>{this.props.mmd}</td>
              </tr>
            </tbody>
          </Table>
          <Button
            className="btn btn-primary"
            style={{ width: "100%" }}
            variant="primary"
            onClick={() => this.findTirp()}
            disabled={!this.props.canExplore}
          >
            Explore TIRP
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchMeanPresentation;
