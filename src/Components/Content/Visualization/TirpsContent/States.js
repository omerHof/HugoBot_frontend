import React, { Component } from "react";
import { Card, Form, Table } from "react-bootstrap";

class States extends Component{
 state = {
    filters: [],
  };
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    for (let key in window.statesKeys) {
      this.state.filters.push({
        key: window.statesKeys[key],
        value: "",
      });
    }
  }

  filter = () => {
    let newFilter = [...this.state.filters];

    for (let key in window.statesKeys) {
      let keyName = window.statesKeys[key];
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
          {window.statesKeys.map((key) => (
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
          {window.statesKeys.map((key) => (
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
    let tables = JSON.parse(window.States);
    return tables.States.map((iter, idx) => {
      iter = JSON.parse(iter);
      if (this.check(iter)) {
        return (
          <tr>
            {window.statesKeys.map((key) => (
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
    for (let key in window.statesKeys) {
      if (
        this.state.filters[key].value.localeCompare("") !== 0 &&
        !iter[window.statesKeys[key]].includes(this.state.filters[key].value)
      ) {
        return false;
      }
    }

    return true;
  }

  render() {
    let that = this;
    window.addEventListener("ReloadStatesTable", function () {
      that.forceUpdate();
    });
    return (
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>States </Card.Text>
        </Card.Header>
        <Card.Body>
        <div className="vertical-scroll-entities-state vertical-scroll-advanced">
          <Table striped={true} bordered={true} hover={true}>
            {this.renderTableHeader()}

            {this.renderTableFilter()}
            <tbody>{this.renderTableData()}</tbody>
          </Table>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default States;