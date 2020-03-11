import React, { Component } from "react";

import {Col, Form, Row} from "react-bootstrap";

import '../../resources/style/colors.css';

class FormElement extends Component{

    defaultProps = {
        type:"text",
    };

    render() {
        return (
            <Row>
                <Col md={5}>
                    {this.props.name} {this.props.warningText}
                    {/*<Form.Text className={"text-danger"}>*/}
                    {/*    {props.warningText}*/}
                    {/*</Form.Text>*/}
                    <Form.Control id={this.props.name} type={this.props.type}/>
                </Col>
                <Col md={7}>
                    {/*feedback*/}
                </Col>
            </Row>
        );
    }
}
export default FormElement;