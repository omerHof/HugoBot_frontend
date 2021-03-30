import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";


class PSearchTable extends Component {
  state = {
    symbols: [],
    relations: [],
    vs0: [],
    vs1: [],
    mhs0: [],
    mhs1: [],
    mmd0: [],
    mmd1: [],
    sizes: [],
    data: [],
    state_dictionary: []
  };

  constructor(props) {
    super(props);
    this.init_state_dict();
    if (this.props.showResult) {
      this.extractData();

    }
  }

  componentDidUpdate() {
    this.init_state_dict();
    if (this.props.showResult) {
      this.extractData();
    }
  }

  init_state_dict() {
    let tables = JSON.parse(window.States);
    tables.States.map((iter, idx) => {
      iter = JSON.parse(iter);
      let name = ""
      let part1 = ""
      let part2 = ""
      if (iter.TemporalPropertyName == undefined) {
        part1 = iter.TemporalPropertyID;
      }
      else {
        part1 = iter.TemporalPropertyName;
      }
      if (iter.BinLabel == undefined) {
        part2 = iter.BinID;
      }
      else {
        part2 = iter.BinLabel;
      }
      name = part1 + "." + part2;
      this.state.state_dictionary[iter.StateID] = name;
    })
  }

  getSymbols(tirp) {
    let symbols = tirp.split('-');
    symbols[0] = symbols[0].substring(1);
    let symbolsStr = ""
    let i = 0
    for (i = 0; i < symbols.length - 2; i++) {
      symbolsStr += this.state.state_dictionary[symbols[i]] + "-";

    }
    symbolsStr += this.state.state_dictionary[symbols[symbols.length - 2]];
    return symbolsStr;
  }


  extractData() {
    this.state.vs1 = [];
    this.state.vs0 = [];
    this.state.mhs0 = [];
    this.state.mhs1 = [];
    this.state.mmd0 = [];
    this.state.mmd1 = [];
    this.state.symbols =[];
    this.state.relations = [];
    this.state.sizes = [];

    this.state.labelClass0 =
      window.name_of_class_0 != "" ? window.name_of_class_0 : "Class 0";
    this.state.labelClass1 =
      window.name_of_class_1 != "" ? window.name_of_class_1 : "Class 1";
    // extract the results from the backend
    for (let result in window.PsearchFinalResults) {
      let curr_result = window.PsearchFinalResults[parseInt(result)]; //check here fot more details
      let exist_in_class_1 = curr_result[15] == "True";
      let exist_in_class_0 = curr_result[16] == "True";
      let vs0 = parseFloat(
        ((curr_result[2] / window.num_of_entities) * 100).toFixed(0)
      );
      let vs1 = parseFloat(curr_result[5]);
      if (!exist_in_class_0) {
        vs0 = window.dataSetInfo.min_ver_support;
        vs1 = curr_result[5] / window.num_of_entities_class_1;
      } else {
        if (exist_in_class_1) {
          vs1 = vs1 / window.num_of_entities_class_1;
        } // only 0
        else {
          vs1 = vs1 * 2;
        }
      }
      this.state.vs1.push(vs0);
      this.state.vs0.push(parseFloat((vs1 * 100).toFixed(0)));
      this.state.mhs0.push(curr_result[6]);
      this.state.mhs1.push(curr_result[3]);
      this.state.mmd0.push(curr_result[8]);
      this.state.mmd1.push(curr_result[7]);
      this.state.symbols.push(curr_result[0]);
      this.state.relations.push(curr_result[1]);
      this.state.sizes.push(parseFloat(curr_result[4]));
    }
  }

  renderTableData = () => {
    let data = [];
    var i;
    for (i = 0; i < this.state.sizes.length; i++) {
      data.push({
        id: i,
        Level: this.state.sizes[i],
        Symbol: this.getSymbols(this.state.symbols[i]),
        Relation: this.state.relations[i],
        Score: 0,
        VS1: this.state.vs1[i],
        VS0: this.state.vs0[i],
        MHS1: this.state.mhs1[i],
        MHS0: this.state.mhs0[i],
        MMD1: this.state.mmd1[i],
        MMD0: this.state.mmd0[i]
      })
    }
    return data;
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
        dataField: "Level",
        text: "Level",
      },
      {
        dataField: "Symbol",
        text: "Symbol",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "Relation",
        text: "Relation",
      },
      {
        dataField: "Score",
        text: "Score",
      },
      {
        dataField: "VS1",
        text: "V.S.1",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "VS0",
        text: "V.S.0",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "MHS1",
        text: "M.H.S.1",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "MHS0",
        text: "M.H.S.0",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "MMD1",
        text: "M.M.D.1",
        sort: true,
        headerSortingStyle,
      },
      {
        dataField: "MMD0",
        text: "M.M.D.0",
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
    let selected = [];
    if (isSelect) {
      selected =
        [
          row.VS1,
          row.VS0,
          row.MHS1,
          row.MHS0,
          row.MMD1,
          row.MMD0,
          row.Level,
          this.state.symbols[row.id],
          row.Relation
        ];
    }
    else {
      selected.filter((x) => x !== row.id);
    }
    this.props.handleOnSelect(selected);
  };

  render() {
    const selectRow = {
      mode: "radio",
      bgColor: "#AED6F1",
      hideSelectColumn: true,
      clickToSelect: true,
      onSelect: this.handleOnSelect
    };
    const defaultSorted = [
      {
        dataField: "Level",
        order: "asc",
      },
    ];

    return (
      <Row>
        <Col >
          <div className="search-table">
            <BootstrapTable
              keyField="id"
              data={this.renderTableData()}
              columns={this.get_columns()}
              selectRow={selectRow}
              striped={true}
              hover={true}
              scroll={true}
              defaultSorted={defaultSorted}
              noDataIndication="Table is Empty"
            />
          </div>
        </Col>
      </Row>
    )
  }
}
export default PSearchTable;