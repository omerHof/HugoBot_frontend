import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";



class SearchIntervals extends Component {
    state = {
        title: "",
        data: [],
        selected: []
    };

    constructor(props) {
        super(props);
        let intervals = this.props.intervals;
        for (var key in intervals) {
            this.state.data.push({ 'id': key, 'name': intervals[key] })
            this.state.selected.push(key);
        }
    }

    handleOnSelect = (row, isSelect) => {
        let newSelected;
        if (isSelect) {
            newSelected = [...this.state.selected, row.id];
        }
        else {
            newSelected = this.state.selected.filter(x => x !== row.id);
        }
        this.setState({ selected: newSelected });
        this.props.changeList(newSelected);
    }

    handleOnSelectAll = (isSelect, rows) => {
        let newSelected = []; 
        if (isSelect) {
            newSelected = rows.map(r => r.id);   
        }
        this.setState({ selected: newSelected });
        this.props.changeList(newSelected);        
    }


    render() {
        const columns = [{
            dataField: 'id',
            text: 'Interval`s id',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Interval`s name'
        }];

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected,
            style: { background: 'blue' },
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };


        return (
            <div>
                <Card>
                    <Card.Header className={"bg-hugobot"}>
                        <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                            {this.props.title}
                        </Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <div className="vertical-scroll vertical-scroll-advanced">
                            <BootstrapTable
                                keyField='id'
                                data={this.state.data}
                                columns={columns}
                                selectRow={selectRow}
                            />                            
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default SearchIntervals;