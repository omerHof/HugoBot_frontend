import React, { Component } from "react";

import { Button, Col, Container, Row } from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";

import History from "../../../History";

/**
 * this class is responsible for doing redirect to the visualization system.
 * it gets FormData-
 Keys-
 data_set_name
 className
 timestamp
 secondclassName
 username
 comments
 output(file)
 states(file)
 entities(file)
 rawData(file)
 secondClassOutput(file)
 */

class Visualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_set_name: "",
      username: "",
      output: null,
      output_0: null,
      timestamp: "Years",
      rawData: null,
      states: null,
    };

    if (
      !(
        "datasetName" in sessionStorage &&
        "currDisc" in sessionStorage &&
        "currKL" in sessionStorage
      )
    ) {
      window.alert(
        "please run a Time Interval Mining before proceeding to the Visualization module."
      );
      sessionStorage.setItem("Workflow", "TIM");
      window.open("/Home/TIM", "_self");
    } else {
      let datasetName = sessionStorage.getItem("datasetName");
      let disc_id = sessionStorage.getItem("currDisc");
      let kl_id = sessionStorage.getItem("currKL");

      this.getUsername().then((UsernameResponse) => {
        this.getRawDataFile(datasetName).then((RawDataResponse) => {
          this.getStatesFile(datasetName, disc_id).then((StatesResponse) => {
            this.getKLClassOutput(datasetName, disc_id, kl_id, "0")
              .then((KL0Response) => {
                if (
                  UsernameResponse.status < 400 &&
                  RawDataResponse.status < 400 &&
                  StatesResponse.status < 400
                ) {
                  if (KL0Response.status < 400) {
                    //if class 0 exists then class 1 exists as well
                    this.getKLClassOutput(
                      datasetName,
                      disc_id,
                      kl_id,
                      "1"
                    ).then((KL1Response) => {
                      if (KL1Response.status < 400) {
                        this.setState({
                          data_set_name: datasetName,
                          username: UsernameResponse.data["Name"],
                          output: KL1Response.data,
                          output_0: KL0Response.data,
                          timestamp: "Years",
                          rawData: RawDataResponse.data,
                          states: StatesResponse.data,
                        });
                      } else {
                        //unexpected scenario, class 0 exists but not 1, don't send a request
                        window.alert("uh oh, there's a problem!");
                      }
                    });
                  }
                } else {
                  //unexpected scenario, either username, raw data or states requests failed, don't send request
                  window.alert("uh oh, there's a problem!");
                }
              })
              .catch((error) => {
                if (error.response.status === 404) {
                  this.getKLOutput(datasetName, disc_id, kl_id)
                    .then((KLResponse) => {
                      if (KLResponse.status < 400) {
                        this.setState({
                          data_set_name: datasetName,
                          username: UsernameResponse.data["Name"],
                          output: KLResponse.data,
                          output_0: null,
                          timestamp: "Years",
                          rawData: RawDataResponse.data,
                          states: StatesResponse.data,
                        });
                      } else {
                        window.alert("uh oh, there's a problem!");
                      }
                    })
                    .catch((error) => {
                      //unexpected scenario, neither Kl-class-0.0.txt nor KL.txt exist, don't send request
                      window.alert(error.response.data["message"]);
                    });
                } else {
                  window.alert(error.response.data["message"]);
                }
              });
          });
        });
      });
    }
  }

  getUsername = () => {
    const url = "/api/getUserName";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
    };
    return Axios.get(url, config);
  };

  getRawDataFile = (dataset_name) => {
    const url = "/api/getRawDataFile?id=" + dataset_name;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
      responseType: "blob",
    };
    return Axios.get(url, config);
  };

  getStatesFile = (dataset_name, disc_id) => {
    const url =
      "/api/getStatesFile?dataset_id=" + dataset_name + "&disc_id=" + disc_id;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
      responseType: "blob",
    };
    return Axios.get(url, config);
  };

  getKLOutput = (dataset_name, disc_id, kl_id) => {
    const url =
      "/api/getKLOutput?" +
      "dataset_id=" +
      dataset_name +
      "&disc_id=" +
      disc_id +
      "&kl_id=" +
      kl_id;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
      responseType: "blob",
    };
    return Axios.get(url, config);
  };

  getKLClassOutput = (dataset_name, disc_id, kl_id, num_class) => {
    const url =
      "/api/getKLOutput?" +
      "dataset_id=" +
      dataset_name +
      "&disc_id=" +
      disc_id +
      "&kl_id=" +
      kl_id +
      "&class=" +
      num_class;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": cookies.get("auth-token"),
      },
      responseType: "blob",
    };
    return Axios.get(url, config);
  };

  sendVisualRequest = () => {
    const url = window.base_url + "/upload";
    // 'http://localhost:5000/upload';

    const formData = new FormData();
    // let datasetName = sessionStorage.getItem("datasetName");
    // let disc_id = sessionStorage.getItem("currDisc");
    // let kl_id = sessionStorage.getItem("currKL");
    // this.setState({
    //     data_set_name: sessionStorage.getItem("datasetName"),
    //     username: "test",
    //     output: KL1Response.data,
    //     output_0: KL0Response.data,
    //     timestamp: "Years",
    //     rawData: RawDataResponse.data,
    //     states: StatesResponse.data,
    // });
    formData.append("data_set_name", this.state.data_set_name);
    formData.append("username", this.state.username);
    formData.append("className", "class1name");
    formData.append("output", this.state.output);
    formData.append("secondclassName", "class0name");
    formData.append("timestamp", "Minutes");
    formData.append("comments", "no comment");
    formData.append("rawData", this.state.rawData);
    formData.append("states", this.state.states);

    if (this.state.output_0 !== null) {
      formData.append("secondClassOutput", this.state.output_0);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return Axios.post(url, formData, config);
  };

  handleVisualRequest = () => {
    this.sendVisualRequest().then((response) => {
      console.log(response.data);
      if (response.status < 400) {
        window.alert("success!");
        // window.location.replace("http://localhost:3001/Client_final_project_6.5/routing/index.html")
        window.open("#/Home", "_self");
      } else {
        window.alert("uh oh, there's a problem!");
      }
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={10}>
            <Button
              block={true}
              className={"btn-hugobot"}
              onClick={this.handleVisualRequest}
              type={"submit"}
            >
              Visualize TIM
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Visualization;
