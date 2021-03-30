import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Card, Form, Row, Button, Col } from "react-bootstrap";
// import WeightsForm from "./WeightsForm";

class SearchAxisPop extends Component {
    state = {
        measureToAxis: {},
        axisToMeasure: {}
    };

    constructor(props) {
        super(props);
        this.state.measureToAxis = props.measureToAxis;
        this.state.axisToMeasure = props.axisToMeasure;
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onUpdate(this.state.measureToAxis, this.state.axisToMeasure);
    }

    onChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        if (Number(name)) {
            name = Number(name);
            this.state.measureToAxis[val] = name;
            this.state.axisToMeasure[name] = val;
        }
    }

    render() {
        return (
            <div className="axis">
                <Row>
                    <Col >

                        <Form.Label className={"text-bold-black"} >X Axis</Form.Label>

                        <Form.Control name="1" as="select" defaultValue={this.state.axisToMeasure[1]} onChange={this.onChange.bind(this)}>
                            <option value="vs">Vertical Support</option>
                            <option value="mhs">Mean Horizontal Support</option>
                            <option value="mmd">Mean Mean Duration</option>
                        </Form.Control>

                    </Col>

                    <Col>

                        <Form.Label className={"text-bold-black fat_label"}> Y Axis     </Form.Label>

                        <Form.Control name="2" as="select" defaultValue={this.state.axisToMeasure[2]} onChange={this.onChange.bind(this)}>
                            <option value="vs">Vertical Support</option>
                            <option value="mhs">Mean Horizontal Support</option>
                            <option value="mmd">Mean Mean Duration</option>
                        </Form.Control>

                    </Col>
                    <Col>

                        <Form.Label className={"text-bold-black"}>Bubble Color </Form.Label>

                        <Form.Control name="3" as="select" defaultValue={this.state.axisToMeasure[3]} onChange={this.onChange.bind(this)}>
                            <option value="vs">Vertical Support</option>
                            <option value="mhs">Mean Horizontal Support</option>
                            <option value="mmd">Mean Mean Duration</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className={"text-bold-black"}></Form.Label>
                        <center>
                            <Button className={"bg-hugobot fix-margin"} onClick={this.onSubmit.bind(this)}>
                                Set
                            </Button>
                        </center>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchAxisPop;
