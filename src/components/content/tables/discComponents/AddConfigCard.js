import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../../layout/colors.css"
import Form from "react-bootstrap/Form";
import {FormControl, FormText} from "react-bootstrap";

class AddConfigCard extends Component{
    render() {
        return (
            <Card style={{ width: 'auto' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Temporal Abstraction
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Card style={{width:'30%'}}>
                            <Card.Body>
                                <Form.Label>
                                    PAA Window Size
                                </Form.Label>
                                <FormControl type={"text"} >

                                </FormControl>
                                <Form.Control type={"text"} placeholder="1" />
                            </Card.Body>
                        </Card>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}
export default AddConfigCard;