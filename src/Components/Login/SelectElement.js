import React, { Component } from "react";

import {Col, Row} from "react-bootstrap";

import '../../resources/style/colors.css';

class SelectElement extends Component{

    static defaultProps = {
        options:["select"]
    };

    optionsConst = this.props.options;
    optionsToRender = this.optionsConst.map((option) => <option>{option}</option>);

    render() {
        return (
            <Row>
                <Col md={5}>
                    {this.props.name}
                    <select id={this.props.name} className={"form-control"} onChange={this.props.onChange}>
                        {this.optionsToRender}
                    </select>
                </Col>
                <Col md={7}>
                    {/*feedback*/}
                </Col>
            </Row>
        );
    }
}
export default SelectElement;