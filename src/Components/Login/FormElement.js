import React, { Component } from "react";
import '../../resources/style/colors.css';
import {Col, Row, Form} from "react-bootstrap";

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