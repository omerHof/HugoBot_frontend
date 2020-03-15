import React, { Component } from "react";
import {Button, ButtonGroup, Card, Form, Table} from "react-bootstrap";
import SelectElement from "../../Login/SelectElement";
import {Link, Router} from "react-router-dom";

class VMapFile extends Component{

    renderTableHeader = () => {
        return(
            <tr>
                <td>
                    Variable ID
                </td>
                <td>
                    Variable Name
                </td>
                <td>
                    Variable Description
                </td>
            </tr>
        );
    };

    renderTableRow = (idx) => {
        return (
            <tr>
                <td>
                    <Form.Control id={"id"+idx}/>
                </td>
                <td>
                    <Form.Control id={"name"+idx}/>
                </td>
                <td>
                    <Form.Control id={"description"+idx}/>
                </td>
            </tr>
        );
    };

    render() {
        return (
            <Card>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Dataset
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <ButtonGroup>
                        <Button className="btn-hugobot" type={"button"}>
                            <i className="fas fa-edit"/>&nbsp;
                            Create new Variable Map
                        </Button>
                        <Button className="btn-hugobot" type={"button"}>
                            <i className="fas fa-upload"/>&nbsp;
                            Upload Variable Map
                        </Button>
                        <Button className="btn-hugobot" type={"button"}>
                            <i className="fas fa-check-square"/>&nbsp;
                            Proceed to Step 3
                        </Button>
                    </ButtonGroup>
                    <br/>
                    <br/>
                    <br/>
                    <Table>
                        {this.renderTableHeader()}
                        <br/>
                        {this.renderTableRow("1")}
                    </Table>
                    <br/>
                    <br/>
                    <br/>
                    <Button className={"btn-hugobot"}>
                        Proceed to Step 3
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}
export default VMapFile;