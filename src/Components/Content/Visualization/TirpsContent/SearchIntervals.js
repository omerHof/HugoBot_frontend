import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";



class SearchIntervals extends Component {
    state = {
        title: "",
        interval_names: []
    };

    constructor(props) {
        super(props);
        let a = this.props.intervals;
        props.intervals.forEach(interval_name => {
            this.state.interval_names.push({ 'name': interval_name })
        });

    }
    render() {
        const columns = [{
            dataField: 'name',
            text: 'Interval`s name'
        }]; 

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true                            
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
                                // keyField='id'
                                keyField='name'
                                data={this.state.interval_names}
                                // data = { data}
                                columns={ columns }
                                selectRow={  selectRow  }

                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default SearchIntervals;