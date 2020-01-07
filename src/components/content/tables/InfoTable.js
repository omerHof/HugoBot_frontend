import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class InfoTable extends Component {

    renderTableData=()=> {
        return this.props.InfoTable.rows.map((iter) => {
            return (
               <tr
                >
                    <td>{"iter.VariableID"}</td>
                    <td>{"iter.VariableName"}</td>
                    <td>{"iter.Description"}</td>
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

export default InfoTable ;
