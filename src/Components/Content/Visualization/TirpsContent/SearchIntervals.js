import React, { Component } from "react";
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
        let isAllSelected = (newSelected.length==this.state.data.length);
        this.props.changeAllselected(isAllSelected)  
    }  

    handleOnSelectAll = (isSelect, rows) => {
        let newSelected = [];
        if (isSelect) {
            newSelected = rows.map(r => r.id);
        }
        this.setState({ selected: newSelected });
        this.props.changeList(newSelected);
        this.props.changeAllselected(isSelect);
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
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };


        return (
            <div className="intervals">
                <label >{this.props.title}</label>
                <div className="vertical-scroll-intervals">
                    <BootstrapTable
                        keyField='id'
                        data={this.state.data}
                        columns={columns}
                        selectRow={selectRow}
                        classes="btable"
                        striped={true}
                        hover={true}
                    />
                </div>
            </div>
        );
    }
}

export default SearchIntervals;