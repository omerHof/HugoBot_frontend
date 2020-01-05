import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class DiscretizationTable extends Component {

    renderTableData=()=> {
        return this.props.InfoTable.rows.map((iter) => {
            return (
                <tr key={iter.VariableID}
                >
                    <td>{iter.VariableID}</td>
                    <td>{iter.VariableName}</td>
                    <td>{iter.Description}</td>
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
