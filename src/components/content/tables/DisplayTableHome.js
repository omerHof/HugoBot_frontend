import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class DisplayTableHome extends Component {

    renderTableData=()=> {
        return this.props.HomeTable.rows.map((iter) => {
            return (
                <tr>
                    <td>{iter.UserID}</td>
                    <td>{iter.DatasetName}</td>
                    <td>{iter.Category}</td>
                    <td>{iter.Size}</td>
                    <td>{iter.Owner}</td>
                    <td>{iter.PublicPrivate}</td>
                </tr>
            )
        })
    };

    render() {
        return (
            <Table striped={true} bordered={true} hover={true} size={"md"}>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </Table>
        )
    }
}

export default DisplayTableHome ;