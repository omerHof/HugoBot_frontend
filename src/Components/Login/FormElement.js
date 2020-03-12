import React, { Component } from "react";

import {Col, Form, Row} from "react-bootstrap";

import '../../resources/style/colors.css';

class FormElement extends Component{

    static defaultProps = {
        type:"text",
        as:"input",
        rows:"1"
    };

    render() {
        return (
            <Row>
                <Col md={5}>
                    {this.props.name} {this.props.warningText}
                    {/*<Form.Text className={"text-danger"}>*/}
                    {/*    {props.warningText}*/}
                    {/*</Form.Text>*/}
                    <Form.Control id={this.props.name} type={this.props.type} as={this.props.as} rows={this.props.rows}/>
                </Col>
                <Col md={7}>
                    {/*feedback*/}
                </Col>
            </Row>
        );
    }
}
export default FormElement;