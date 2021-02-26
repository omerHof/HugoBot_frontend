import React, { Component } from "react";
import { Card, Form, Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Link, HashRouter } from "react-router-dom";
import "../../../../resources/style/colors.css";
import "../../../../resources/style/workflow.css";
import TIRPsPie from "./TIRPsPie";
import TIRPTimeLine from "./TIRPTimeLine";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import history from "../../../../History";
import Popup from "reactjs-popup";
import TirpMatrix from "../TirpsContent/TirpMatrix";
import { useState } from "react";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Axios from "axios";
import cookies from "js-cookie";
import SelectedTIRPTable from "./SelectedTIRPTable";
/**
 * this class contains the display of the the table from table content
 */

class TIRPsTable extends Component {
  state = {
    currentRow: [],
    currentTirps: [],
    loadingNextLevel: false,
    data: [],
    selected: [],
    showPopup: false,
    modalShow: false,
  };
  constructor(props) {
    super(props);
    this.renderTableData();
  }

  componentDidMount() {
    if (sessionStorage.getItem("user").localeCompare("true") !== 0) {
      window.open("#/Login", "_self");
    }

    sessionStorage.setItem("dataSet", "false");
    window.dispatchEvent(new Event("ReloadTable1"));
    window.dispatchEvent(new Event("ReloadDataSet"));
  }

  temp = (row) => {
    this.state.currentRow = row.iter;
    window.dispatchEvent(new Event("ReloadTirpTable"));
    this.renderTableData();
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
            <i className="fas fa-caret-down" id={"toy_example-icon"} />
          </Button>
        );
      }
    }
  };

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
    this.renderTableData();
    this.forceUpdate();
  };
  has_childs_class_0 = (childs) => {
    if (childs[0] == true) return true;
    for (var i = 0; i < childs.length; i++) {
      if (childs[i]._TIRP__exist_in_class0) return true;
    }
    return false;
  };

  renderTableData = () => {
    let tables = [];
    if (this.state.currentTirps.length == 0) {
      tables = this.props.table;
    } else {
      tables = this.state.currentTirps;
    }
    this.state.data = [];

    return tables.map((iter, idx) => {
      if (this.state.currentRow.length == 0) {
        this.state.currentRow = iter;
      }
      this.state.data.push({
        id: idx,
        Next: this.hasChild(iter),
        // Next: "ff",
        Relation: this.getRel(iter),
        Symbol: iter["_TIRP__symbols"][iter["_TIRP__symbols"].length - 1],
        Vertical_Support:
          "" +
          (
            (iter["_TIRP__vertical_support"] / window.window.num_of_entities) *
            100
          ).toFixed(1) +
          "%",
        Mean_Horizontal_Support: iter["_TIRP__mean_horizontal_support"],
        Mean_Mean_Duration: iter["_TIRP__mean_duration"],
        iter: iter,
      });
    });
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
        this.renderTableData();
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
    this.renderTableData();
    this.forceUpdate();
  };

  get_columns = () => {
    const headerSortingStyle = { backgroundColor: "#c8e6c9" };

    const columns = [
      {
        dataField: "id",
        text: "Interval`s id",
        hidden: true,
      },
      {
        dataField: "Next",
        text: "Next",
      },
      {
        dataField: "Relation",
        text: "Relation",
      },
      {
        dataField: "Symbol",
        text: "Symbol",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "Vertical_Support",
        text: "Vertical Support",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "Mean_Horizontal_Support",
        text: "Mean Horizontal Support",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "Mean_Mean_Duration",
        text: "Mean Mean Duration",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "iter",
        text: "iter",
        hidden: true,
      },
    ];
    return columns;
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.state.selected = [];
      this.setState(() => ({
        selected: [...this.state.selected, row.id],
      }));
      this.temp(row);
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.id),
      }));
    }
  };
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  setModalShow(value) {
    this.state.modalShow = value;
    this.forceUpdate();
  }
  render() {
    let that = this;
    window.addEventListener("ReloadEntitiesTable", function () {
      that.forceUpdate();
    });
    const selectRow = {
      mode: "checkbox",
      bgColor: "#AED6F1",
      hideSelectColumn: true,
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
    };
    // const [modalShow, setModalShow] = React.useState(false);

    const defaultSorted = [
      {
        dataField: "Symbol",
        order: "desc",
      },
    ];
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
          <Col sm={10}>
            <Card>
              <Card.Header className={"bg-hugobot"}>
                <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                  Tirp's Table{" "}
                </Card.Text>
              </Card.Header>
              <Card.Body className={"text-hugobot"}>
                {/* <Table
                  responsive={true}
                  striped={true}
                  hover={true}
                  scroll={true}
                >
                  {this.renderTableHeader()}
                  <tbody>{this.renderTableData()}</tbody>
                </Table> */}
                <div className="vertical-scroll-tirp">
                  <BootstrapTable
                    keyField="id"
                    data={this.state.data}
                    columns={this.get_columns()}
                    selectRow={selectRow}
                    striped={true}
                    hover={true}
                    scroll={true}
                    defaultSorted={defaultSorted}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}>
            <SelectedTIRPTable
              table={this.state.currentRow}
              type_of_comp="tirp"
            ></SelectedTIRPTable>
            <Button variant="primary" onClick={() => this.setModalShow(true)}>
              Launch vertically centered modal
            </Button>

            <TirpMatrix
              className="popup"
              show={this.state.modalShow}
              row={this.state.currentRow}
              onHide={() => this.setModalShow(false)}
            ></TirpMatrix>
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            <TIRPsPie
              row={this.state.currentRow}
              type_of_comp="tirp"
            ></TIRPsPie>
          </Col>
          <Col sm={8}>
            <TIRPTimeLine
              row={this.state.currentRow}
              type_of_comp="tirp"
            ></TIRPTimeLine>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TIRPsTable;
