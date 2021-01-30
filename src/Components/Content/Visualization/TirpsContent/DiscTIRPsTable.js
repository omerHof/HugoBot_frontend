import React, { Component } from "react";
import { Card, Table, Button,Row,Col } from "react-bootstrap";
import { Link, HashRouter } from "react-router-dom";
import "../../../../resources/style/colors.css";
import "../../../../resources/style/workflow.css";
import TIRPsPie from "./TIRPsPie";
import TIRPTimeLine from "./TIRPTimeLine";
import Container from "react-bootstrap/Container";
import history from "../../../../History";
import WeightsForm from "./WeightsForm";
import SelectedTIRPTable from "./SelectedTIRPTable";
import Axios from "axios";
import cookies from "js-cookie";
/**
 * this class contains the display of the the table from table content
 */

class TIRPsTable extends Component {
  state = {
    currentRow: [],
    currentTirps: [],
    loadingNextLevel: false,
    weighted_vs: 34,
    weighted_mhs: 33,
    weighted_mmd:33,

  };
  constructor(props) {
    super(props);
    this.changeWeightsValue = this.changeWeightsValue.bind(this);
  }
  changeWeightsValue = (value) => {
    this.state.weighted_vs = value[0]
    this.state.weighted_mhs = value[1]
    this.state.weighted_mmd = value[2]
    this.forceUpdate()
  }

  

  componentDidMount() {
    if (sessionStorage.getItem("user").localeCompare("true") !== 0) {
      window.open("#/Login", "_self");
    }

    sessionStorage.setItem("dataSet", "false");
    window.dispatchEvent(new Event("ReloadTable1"));
    window.dispatchEvent(new Event("ReloadDataSet"));
  }

  renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th> Next </th>
          <th> Relation </th>
          <th> Symbol </th>
          <th> Score </th>
          <th> VS.1 </th>
          <th> VS.0 </th>
          <th> MHS.1 </th>
          <th> MHS.0 </th>
          <th> MMD.1 </th>
          <th> MMD.0 </th>
        </tr>
      </thead>
    );
  };

  renderTableData = () => {
    let tables = [];
    if (this.state.currentTirps.length == 0) {
      tables = this.props.table;
    } else {
      tables = this.state.currentTirps;
    }
    return tables.map((iter, idx) => {
      let x = iter;
      let y = idx;
      if (this.state.currentRow.length == 0) {
        this.state.currentRow = iter;
      }
      return (
        <tr onClick={() => this.temp(iter)}>
          {/*<td>{iter["UserID"]}</td>*/}
          <td> {this.hasChild(iter)} </td>
          <td> {this.getRel(iter)} </td>
          <td> {iter["_TIRP__symbols"][iter["_TIRP__symbols"].length - 1]} </td>
          <td>{this.getScore(iter)}</td>
          <td>
            {" "}
            {(
              (iter["_TIRP__vertical_support"] /
                window.window.num_of_entities) *
              100
            ).toFixed(1)}
            %{" "}
          </td>
          <td> {" "}
            {(
              (iter["_TIRP__vertical_support_class_1"] /
                window.window.num_of_entities_class_1) *
              100
            ).toFixed(1)}
            %{" "}</td>
          <td> {iter["_TIRP__mean_horizontal_support"]} </td>
          <td>{iter["_TIRP__mean_horizontal_support_class_1"]}</td>
          <td> {iter["_TIRP__mean_duration"]} </td>
          <td>{iter["_TIRP__mean_duration_class_1"]}</td>
        </tr>
      );
    });
  };

  
  temp = (iter) => {
    this.state.currentRow = iter;
    window.dispatchEvent(new Event("ReloadTirpTable"));
    this.forceUpdate();
  };

  getRel = (tirp) => {
    if (tirp == undefined) return "";
    if (tirp._TIRP__rel.length == 0) {
      return "-";
    }
    if (tirp._TIRP__rel[tirp._TIRP__rel.length - 1] == "finished by")
      return "finish-by";
    return tirp._TIRP__rel[tirp._TIRP__rel.length - 1];
  };

  hasChild = (tirp) => {
    if (tirp == undefined) return "";
    else {
      if (
        tirp._TIRP__childes.length == 0 ||
        !this.has_childs_class_0(tirp._TIRP__childes)
      )
        return "";
      else {
        return (
          <Button
            className={"btn btn-hugobot"}
            id={"toy_example-btn"}
            onClick={() => this.go_to_next_level(tirp)}
          >
            <i className="fas fa-download" id={"toy_example-icon"} />
          </Button>
        );
      }
    }
  };

  getScore = (tirp) => {
    if (tirp == undefined)
        return "";
    let vs0 = 0
    let vs1 = 0
    if (tirp._TIRP__exist_in_class0)
        vs0 =  ((this.getAmountInstancesClass0(tirp)/window.num_of_entities).toFixed(2)*100).toFixed(0)
    
    if (tirp._TIRP__exist_in_class1 || !tirp._TIRP__exist_in_class0)
        vs1 = ((this.getAmountInstancesClass1(tirp)/window.num_of_entities_class_1).toFixed(2)*100).toFixed(0)
    
    let delta_vs = Math.abs(vs0-vs1)
    let delta_mhs = Math.abs(tirp._TIRP__mean_horizontal_support-tirp._TIRP__mean_horizontal_support_class_1)
    let delta_mmd = Math.abs(tirp._TIRP__mean_duration-tirp._TIRP__mean_duration_class_1)
    
    let score = 0
    score = this.state.weighted_vs*delta_vs + this.state.weighted_mhs*delta_mhs + this.state.weighted_mmd*delta_mmd
    return (score/100).toFixed(1);
}

getAmountInstancesClass1 = (tirp) => {
  if (tirp == undefined)
      return "";
  if (tirp._TIRP__exist_in_class1 || !tirp._TIRP__exist_in_class0)
 
      return  tirp._TIRP__vertical_support_class_1
  else
      return "<" + (window.dataSetInfo.min_ver_support*window.num_of_entities_class_1).toFixed(0);
}

getAmountInstancesClass0 = (tirp) => {
  if (tirp == undefined)
      return "";
  if (tirp._TIRP__exist_in_class0)
 
      return  tirp._TIRP__vertical_support
  else
      return "<" + (window.dataSetInfo.min_ver_support*window.num_of_entities).toFixed(0);
  
}


  go_to_next_level = (tirp) => {
    let tirpCopy = Object.assign({}, tirp);
    if (tirpCopy._TIRP__childes.length > 0) tirpCopy.partOfPath = true;
    else tirpCopy.partOfPath = false;
    this.getSubTree(tirpCopy);
  };

  async subTreeFromServer(tirp) {
    const url = window.base_url + "/getSubTree";

    const formData = new FormData();
    formData.append("data_set_name", window.selectedDataSet);
    formData.append("TIRP", tirp._TIRP__symbols[0]);

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
    return res;
  }

  getSubTree = (tirp, index, toLoad) => {
    window.pathOfTirps.push(tirp);
    if (window.pathOfTirps.length == 1) {
      if (tirp.partOfPath) {
        this.state.loadingNextLevel = true;

        this.subTreeFromServer(tirp).then((response) =>
          this.loc_subTree(response, tirp)
        );
      }
    } else {
      let class0Childs = [];
      for (var i = 0; i < tirp._TIRP__childes.length; i++) {
        if (tirp._TIRP__childes[i]._TIRP__exist_in_class0) {
          class0Childs.push(tirp._TIRP__childes[i]);
        }
      }
      tirp._TIRP__childes = class0Childs;
      if (tirp.partOfPath) {
        this.state.currentTirps = tirp._TIRP__childes;
        this.forceUpdate();
      }
    }
  };

  loc_subTree = (response, tirp) => {
    let parsed_tirp = response.data["TIRPs"];
    let tirpWithChilds = JSON.parse(parsed_tirp);
    let class0Childs = [];
    for (var i = 0; i < tirpWithChilds._TIRP__childes.length; i++) {
      if (tirpWithChilds._TIRP__childes[i]._TIRP__exist_in_class0) {
        class0Childs.push(tirpWithChilds._TIRP__childes[i]);
      }
    }
    tirpWithChilds._TIRP__childes = class0Childs;
    let childs = tirpWithChilds._TIRP__childes;
    this.state.loadingNextLevel = false;
    tirpWithChilds.partOfPath = tirp.partOfPath;
    window.pathOfTirps[0] = tirpWithChilds;
    this.state.currentTirps = childs;
    this.forceUpdate();
  };
  has_childs_class_0 = (childs) => {
    if (childs[0] == true) return true;
    for (var i = 0; i < childs.length; i++) {
      if (childs[i]._TIRP__exist_in_class0) return true;
    }
    return false;
  };

 

  createNavbar = (levelName, index) => {
    return (
      <Link
        className={
          sessionStorage.getItem("Workflow").localeCompare("Disc") === 0
            ? "btn btn-workflow-active btn-arrow-right navbar-margin"
            : "btn btn-workflow btn-arrow-right navbar-margin"
        }
        id={"Info"}
        onClick={() => this.go_to_level(index)}
        source={levelName}
        key={levelName}
      >
        {levelName}
      </Link>
    );
  };

  go_to_level = (index) => {
    if (index < window.pathOfTirps.length - 1) {
      window.pathOfTirps = window.pathOfTirps.slice(0, index + 1);
      window.pathOfTirps[window.pathOfTirps.length - 1].partOfPath = false;
      if (window.pathOfTirps.length > 0) {
        this.state.currentTirps =
          window.pathOfTirps[window.pathOfTirps.length - 1]._TIRP__childes;
        this.forceUpdate();
      }
    }
  };

  drawNavbar = () => {
    if (this.state.currentTirps.length > 0) {
      let level_name_list = Array.from(
        this.state.currentTirps[0]._TIRP__symbols
      );
      level_name_list.pop();
      return level_name_list.map(this.createNavbar);
    }
  };

  go_to_root = () => {
    this.state.currentTirps = this.props.table;
    window.pathOfTirps = [];
    this.forceUpdate();
  };

  render() {
    let that = this;
    window.addEventListener("ReloadEntitiesTable", function () {
      that.forceUpdate();
    });
    return (
      <Container fluid>
        <HashRouter>
          <Link
            className={
              sessionStorage.getItem("Workflow").localeCompare("Disc") === 0
                ? "btn btn-workflow-active btn-arrow-right navbar-margin"
                : "btn btn-workflow btn-arrow-right navbar-margin"
            }
            id={"Info"}
            onClick={() => this.go_to_root()}
            source="Root"
            key="Root"
          >
            Root
          </Link>
          {this.drawNavbar()}
        </HashRouter>
        <Row>
          <Col sm={9}>
            <Card>
              <Card.Header className={"bg-hugobot"}>
                <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                  Tirp's Table{" "}
                </Card.Text>
              </Card.Header>
              <Card.Body>
                <div className="vertical-scroll vertical-scroll-advanced">
                  <Table striped={true} hover={true} scroll={true}>
                    {this.renderTableHeader()}
                    <tbody>{this.renderTableData()}</tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={3}>
          <SelectedTIRPTable table = {this.state.currentRow} type_of_comp = "disc"></SelectedTIRPTable>
          </Col>
        </Row>
        <WeightsForm onUpdate={this.changeWeightsValue}/>
        <Row>
          <Col sm={4}>
            <TIRPsPie row={this.state.currentRow} ></TIRPsPie>
          </Col>
          <Col sm={8}>
            <TIRPTimeLine row={this.state.currentRow} type_of_comp = "disc"></TIRPTimeLine>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TIRPsTable;
