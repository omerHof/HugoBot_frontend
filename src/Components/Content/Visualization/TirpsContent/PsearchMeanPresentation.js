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

  findTirp() {
    // self.loaded = false;
    // document.getElementById('loader').style.display = "block";
    const formData = new FormData();
    window.PassedFromSearch = true;
    formData.append("data_set_name", window.selectedDataSet);
    formData.append("symbols", this.props.symbols.replace("(", ""));
    formData.append("relations", this.props.relations);

    this.getPath(formData);
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
          <Redirect to="/TirpsApp/DiscriminativeTIRPs" />
        </HashRouter>
      );
    }
    return (
      <Card className="presentation-card">
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>
            Selected TIRP info{" "}
          </Card.Text>
        </Card.Header>
        <Card.Body className={"text-hugobot"}>
          <div className="vertical-scroll vertical-scroll-advanced">
            <Table responsive={true} striped={true} bordered={true}>
            <thead>
                <tr>
                  <th>Metric</th>
                  <th>Class1</th>
                  <th>Class0</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Current level</th>
                  <td>{this.props.currentLevel}</td>
                  <td>{this.props.currentLevel}</td>
                </tr>
                <tr>
                  <th>Vertical support</th>
                  <td>{this.props.vs1}</td>
                  <td>{this.props.vs0}</td>
                </tr>
                <tr>
                  <th>Mean horizontal_support</th>
                  <td>{this.props.mhs1}</td>
                  <td>{this.props.mhs0}</td>
                </tr>
                <tr>
                  <th>Mean mean duration</th>
                  <td>{this.props.mmd1}</td>
                  <td>{this.props.mmd0}</td>
                </tr>
              </tbody>
            </Table>
          </div>
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
