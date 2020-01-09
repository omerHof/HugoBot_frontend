import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
class DiscretizationTable extends Component {

    toDelete=()=>{

    }

    renderTableData=()=> {
        return this.props.DiscretizationTable.rows.map((iter) => {
            return (
                <tr>
                    <td>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td>
                        {iter.BinsNumber}
                    </td>
                    <td>
                        {iter.InterpolationGap}
                    </td>
                    <td>
                        {iter.PAAWindowSize}
                    </td>
                    <td>
                        {<Button className="bg-hugobot" onClick={this.toDelete}>
                            <i className="fas fa-download"/> Download
                        </Button>}
                    </td>
                </tr>
            )
        })
    };

    render() {
        return (
            <Table striped={true} bordered={true} hover={true}>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </Table>
        )
    }
}

export default DiscretizationTable ;