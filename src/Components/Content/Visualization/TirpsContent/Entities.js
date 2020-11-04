import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Form, Table } from "react-bootstrap";
import cookies from "js-cookie";
import Axios from "axios";

import history from "../../../../History";

/**
 * this class contains the display of the the table from table content
 */

class Entities extends Component {
  state = {
    filters: [],
  };
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    for (let key in window.entitiesKeys) {
      this.state.filters.push({
        key: window.entitiesKeys[key],
        value: "",
      });
    }
  }

  filter = () => {
    let newFilter = [...this.state.filters];

    for (let key in window.entitiesKeys) {
      let keyName = window.entitiesKeys[key];
      newFilter[key] = {
        ...newFilter[key],
        value: document.getElementById(keyName).value,
      };
    }
    this.state.filters = newFilter;

    this.setState((prevState) => ({
      filters: [...prevState.filters],
    }));

    this.forceUpdate();
  };

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
          {window.entitiesKeys.map((key) => (
            <th>{key}</th>
          ))}
        </tr>
      </thead>
    );
  };

  renderTableFilter = () => {
    return (
      <thead>
        <tr>
          {window.entitiesKeys.map((key) => (
            <th>
              <Form.Control
                ref={this.textInput}
                id={key}
                // inputRef={node => this.inputNode = node}
                onChange={this.filter}
                placeholder={"Filter By " + key}
                type={"text"}
              />
            </th>
          ))}
        </tr>
      </thead>
    );
  };
  
  renderTableData = () => {
    let tables = JSON.parse(window.Entities);
    return tables.Entities.map((iter, idx) => {
      iter = JSON.parse(iter);
      if (this.check(iter)) {
        return (
          <tr>
            {window.entitiesKeys.map((key) => (
              <td>{iter[key]}</td>
            ))}
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  check(iter) {
    for (let key in window.entitiesKeys) {
      if (
        this.state.filters[key].value.localeCompare("") !== 0 &&
        !iter[window.entitiesKeys[key]].includes(this.state.filters[key].value)
      ) {
        return false;
      }
    }

    return true;
  }

  render() {
    let that = this;
    window.addEventListener("ReloadEntitiesTable", function () {
      that.forceUpdate();
    });
    return (
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot"}>Entities </Card.Text>
        </Card.Header>
        <Card.Body>
          <Table striped={true} bordered={true} hover={true}>
            {this.renderTableHeader()}

            {this.renderTableFilter()}
            <tbody>{this.renderTableData()}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default Entities;
