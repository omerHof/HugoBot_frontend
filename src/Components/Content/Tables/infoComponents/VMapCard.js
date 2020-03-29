import React, { Component } from "react";

import {Card, Table} from "react-bootstrap";

import "../../../../resources/style/colors.css"

class VMapCard extends Component{
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
                            <tr>
                                <th>Variable ID</th><th>Variable Name</th><th>Description</th>
                            </tr>
                            <tr>
                                <td>1</td><td>HR</td><td>HR</td>
                            </tr>
                            <tr>
                                <td>2</td><td>RESP</td><td>RESP</td>
                            </tr>
                            <tr>
                                <td>999</td><td>UNKNOWN</td><td>UNKNOWN</td>
                            </tr>
                            <tr>
                                <td>3</td><td>ABPMEAN</td><td>ABPMEAN</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
export default VMapCard;