import React, { Component } from "react";

import {Col, Form, Row} from "react-bootstrap";

import '../../resources/style/colors.css';

/**
 * this class is tge rapper that contains all the other forms
 */

class FormElement extends Component{

    static defaultProps = {
        as:"input",
        rows:"1",
        type:"text"
    };

    render() {
        return (
            <Row>
                <Col md={5}>
                    {this.props.name} {this.props.warningText}
                    {/*<Form.Text className={"text-danger"}>*/}
                    {/*    {props.warningText}*/}
                    {/*</Form.Text>*/}
                    <Form.Control id={this.props.name}
                                  as={this.props.as}
                                  onChange={this.props.onChange}
                                  rows={this.props.rows}
                                  type={this.props.type}/>
                </Col>
                <Col md={7}>
                    {/*feedback*/}
                </Col>
            </Row>
        );
    }
}
export default FormElement;