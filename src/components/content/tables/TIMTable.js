import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
class TIMTable extends Component {

    renderTableHeader = () => {
        return (
            <tr>
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
                    PAA Window Size
                </td>
                <td>
                    Epsilon
                </td>
                <td>
                    Max Gap
                </td>
                <td>
                    Min. Vertical Support
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderTableData=()=> {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter) => {
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
                        {iter.epsilon}
                    </td>
                    <td>
                        {iter.MaxGap}
                    </td>
                    <td>
                        {iter.VerticalSupport}
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
            <Table hover={true}>
                <tbody>
                {this.renderTableHeader()}
                {this.renderTableData()}
                </tbody>
            </Table>
        )
    }
}

export default TIMTable ;