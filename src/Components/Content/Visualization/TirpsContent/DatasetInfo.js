import React, { Component } from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";
import "../../../../resources/style/colors.css";

/**
 * this class is responsible for uploading and downloading the data about the discretization.
 * if you upload the discretization you can do it by knowledge based or by grdient file or by regular way.
 * it also gets, interpolation gap, paa window size, number of bins and method of dicretization
 */

class DatasetInfo extends Component {
  state = {
    DataSetName: "name",
    UserName: "",
    ClassName: "",
    ClassEntitiesAmount: "",
    granularity: "",
    StateName: "",
    EntitiesName: "",
    Class0Name: "",
    Class0EntitiesAmount: "",
  };
  constructor(props) {
    super(props);
    this.datasetInfo = [];
    this.getDataOnDataset(window.selectedDataSet).then((response) => {
      this.datasetInfo = response.data["DataSets"];
      this.setState({
        DataSetName: this.datasetInfo[0].data_set_name,
        UserName: this.datasetInfo[0].username,
        ClassName: this.datasetInfo[0].class_name,
        ClassEntitiesAmount: this.datasetInfo[0].num_of_entities,
        granularity: this.datasetInfo[0].timestamp,
        StateName: this.datasetInfo[0].states_file_name,
        EntitiesName: this.datasetInfo[0].entities_file_name,
        Class0Name: this.datasetInfo[0].second_class_name,
        Class0EntitiesAmount: this.datasetInfo[0].num_of_entities_class_1,
      });
      window.num_of_entities = this.datasetInfo[0].num_of_entities;
      window.num_of_entities_class_1 = this.datasetInfo[0].num_of_entities_class_1;
      this.forceUpdate();
    });
  }

  granularityOptions = [
    "Years",
    "Months",
    "Days",
    "Hours",
    "Minutes",
    "Seconds",
  ];

  optionsToRender = this.granularityOptions.map((option) => (
    <option key={option}>{option}</option>
  ));

  getDataOnDataset(id) {
    const url = window.base_url + "/getDataSets";
    let body = {
      data_set_name: id,
    };
    const formData = new FormData();
    // formData.append("file", file);
    formData.append("data_set_name", id);
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
      <Card style={{ width: "auto" }}>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot"}>DataSet information</Card.Text>
        </Card.Header>
        <Card.Body>
          <Form>
            <Container fluid={true}>
              <Row>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    DataSet Name
                  </Form.Label>
                  <Form.Control
                    id={"DataSetName"}
                    name={"DataSetName"}
                    placeholder={" " + this.state.DataSetName}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    DataSet Owner
                  </Form.Label>
                  <Form.Control
                    id={"UserName"}
                    name={"UserName"}
                    placeholder={" " + this.state.UserName}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    Class Name
                  </Form.Label>
                  <Form.Control
                    id={"ClassName"}
                    name={"ClassName"}
                    placeholder={" " + this.state.ClassName}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    Number of Entities
                  </Form.Label>
                  <Form.Control
                    id={"ClassEntitiesAmount"}
                    name={"ClassEntitiesAmount"}
                    placeholder={" " + this.state.ClassEntitiesAmount}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    Maximal granularity
                  </Form.Label>
                  <Form.Control
                    id={"granularity"}
                    name={"granularity"}
                    placeholder={" " + this.state.granularity}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    Class 0 Name
                  </Form.Label>
                  <Form.Control
                    id={"Class0Name"}
                    name={"Class0Name"}
                    placeholder={" " + this.state.Class0Name}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    Number of Entities
                  </Form.Label>
                  <Form.Control
                    id={"Class0EntitiesAmount"}
                    name={"Class0EntitiesAmount"}
                    placeholder={" " + this.state.Class0EntitiesAmount}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    State File Name
                  </Form.Label>
                  <Form.Control
                    id={"StateName"}
                    name={"StateName"}
                    placeholder={" " + this.state.StateName}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className={"font-weight-bold text-dark"}>
                    Entities File Name
                  </Form.Label>
                  <Form.Control
                    id={"EntitiesName"}
                    name={"EntitiesName"}
                    placeholder={" " + this.state.EntitiesName}
                    disabled
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
export default DatasetInfo;
