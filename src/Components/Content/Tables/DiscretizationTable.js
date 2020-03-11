import React, { Component } from "react";

import {Button, Table} from "react-bootstrap";

class DiscretizationTable extends Component {

    toDelete=()=>{

    };

    renderTableHeader = () => {
        return (
            <tr>
                <td>
                    PAA Window Size
                </td>
                <td>
                    Method Of Discretization
                </td>
                <td>
                    Bins Number
                </td>
                <td>
                    Interpolation Gap
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderTableData=()=> {
        return JSON.parse(sessionStorage.DiscretizationTable).rows.map((iter) => {
            return (
                <tr>
                    <td>
                        {iter.PAAWindowSize}
                    </td>
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
                        {<Button className="bg-hugobot" onClick={this.toDelete}>
                            <i className="fas fa-download"/> Download
                        </Button>}
                    </td>
                </tr>
            )
        })
    };

    render() {
        let  that = this;
        window.addEventListener("ReloadTable", function(){that.forceUpdate()});
        return (
            <Table striped={true} bordered={true} hover={true}>
                <tbody>
                {this.renderTableHeader()}
                {this.renderTableData()}
                </tbody>
            </Table>
        )
    }
}

export default DiscretizationTable ;