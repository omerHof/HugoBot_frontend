import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card,Row, Col, Modal, Button } from "react-bootstrap";

class SearchTable extends Component {
  state = {
    symbols: [],
    relations: [],
    vs: [],
    mhs: [],
    sizes: [],
    mmd: [],
    state_dictionary: [],
    rowSelectedId:0,
    selected: [],
    location: 0,
  };

  constructor(props) {
    super(props);
    this.init_state_dict(); 
    if(this.props.showResult){
      this.extractData(); 
     
    }    
  }

  componentDidUpdate(){
    this.init_state_dict();
    if(this.props.showResult){
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

  extractData() {
    this.state.symbols =[];
    this.state.relations=[];
    this.state.vs=[];
    this.state.mhs=[];
    this.state.sizes=[];
    this.state.mmd=[];

    // extract the results from the backend
    for (let result in window.searchFinalResults) {
      let curr_result = window.searchFinalResults[parseInt(result)]; //check here fot more details
      this.state.symbols.push(curr_result[0]);
      this.state.relations.push(curr_result[1]);
      this.state.vs.push(
        parseFloat(((curr_result[2] / window.num_of_entities) * 100).toFixed(0))
      );
      this.state.mhs.push(parseFloat(curr_result[3]));
      this.state.sizes.push(parseFloat(curr_result[4]));
      this.state.mmd.push(parseFloat(curr_result[7]));
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
        Vertical_Support: this.state.vs[i],
        Mean_Horizontal_Support: this.state.mhs[i],
        Mean_Mean_Duration: this.state.mmd[i],
      })
    }
    return data;
  };

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
    let selected = [];
    if (isSelect) {      
      selected = [
        row.Vertical_Support,
        row.Mean_Horizontal_Support,
        row.Mean_Mean_Duration,row.Level,
        this.state.symbols[row.id],
        row.Relation,row.id
      ];      
    }
    else {      
        selected.filter((x) => x !== row.id);
    }
    this.props.handleOnSelect(selected);    
  };

  render() {
    const selectRow = {
      mode: "checkbox",
      bgColor: "#AED6F1",
      hideSelectColumn: true,
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
    };
    const defaultSorted = [
      {
        dataField: "Level",
        order: "asc",
      },
    ];
    return (
      <Row>
        <Col>
          {/* <Card>
            <Card.Header className={"bg-hugobot"}>
              <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                Tirp's Table{" "}
              </Card.Text>
            </Card.Header>
            <Card.Body className={"text-hugobot"}> */}
              <div className="search-table">
                <BootstrapTable
                  keyField="id"
                  data={ this.renderTableData()}
                  columns={this.get_columns()}
                  selectRow={selectRow}
                  striped={true}
                  hover={true}
                  classes="stable"
                  scroll={true}
                  defaultSorted={defaultSorted}
                  noDataIndication="Table is Empty"
                />
              </div>
            {/* </Card.Body> */}
          {/* </Card> */}
        </Col>
        {/* <Col sm={2}> */}
        {/* <SearchMeanPresentation
          vs={this.state.selected[0]}
          mmd={this.state.selected[1]}
          mhs={this.state.selected[2]}
          currentLevel={this.state.selected[3]}
          symbols={this.state.symbols[this.state.rowSelectedId]}
          relations={this.state.selected[5]}
        ></SearchMeanPresentation> */}
      {/* </Col> */}
      </Row>
    )
  }
};

export default SearchTable;