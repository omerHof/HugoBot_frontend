import React, { Component } from "react";

import {Col, Form, Row} from "react-bootstrap";

import '../../resources/style/colors.css';

class DegreeSelect extends Component{

    render() {
        return (
            <Row>
                <Col md={5}>
                    <Form.Text>
                        Degree
                    </Form.Text><br/>
                    <select id={"Degree"} className={"form-control"}>
                        <option>B.Sc</option>
                        <option>M.Sc</option>
                        <option>Ph.D</option>
                    </select>
                </Col>
                <Col md={7}>
                    {/*feedback*/}
                </Col>
            </Row>
        );
    }
}
export default DegreeSelect;