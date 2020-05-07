import React, { Component } from "react";

import {Card, Table} from "react-bootstrap";

import "../../../../resources/style/colors.css"

class VMapCard extends Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    renderTableData = () => {
        return this.props.VMap.map((iter,idx) => {
            return (
                <tr key={idx.toString()}>
                    <td id={"tdVariableID"+idx}>
                        {iter[0]}
                    </td>
                    <td id={"tdVariableName"+idx}>
                        {iter[1]}
                    </td>
                    <td id={"tdVariableDescription"+idx}>
                        {iter[2]}
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Card style={{ width: '30rem' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        <i className="fas fa-info"/> Variables Information
                    </Card.Text>
                </Card.Header>
                <Card.Body as={"small"}>
                    <Table striped={true} hover={true}>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
export default VMapCard;