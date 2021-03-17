import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Card, Form, Row, Button, Col } from "react-bootstrap";
// import WeightsForm from "./WeightsForm";

class PsearchAxisPop extends Component {
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
        this.props.onHide(true)
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
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Card>
                        <Card.Header className={"bg-hugobot"}>
                            <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                                Select Axis{" "}
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>

                            <Form onSubmit={this.onSubmit.bind(this)} role="form">

                                <Form.Group>
                                    <Form.Label className={"text-bold-black"} >X Axis</Form.Label>
                                    <Form.Control name="1" as="select" defaultValue={this.state.axisToMeasure[1]} onChange={this.onChange.bind(this)}>
                                        <option value="vs0">Vertical Support Class 0</option>
                                        <option value="vs1">Vertical Support Class 1</option>
                                        <option value="dmmd">Delta M.M.D</option>
                                        <option value="dmhs">Delta M.H.S</option>
                                    </Form.Control>

                                    <Form.Label className={"text-bold-black fat_label"}>Y Axis </Form.Label>
                                    <Form.Control name="2" as="select" defaultValue={this.state.axisToMeasure[2]} onChange={this.onChange.bind(this)}>
                                        <option value="vs0">Vertical Support Class 0</option>
                                        <option value="vs1">Vertical Support Class 1</option>
                                        <option value="dmmd">Delta M.M.D</option>
                                        <option value="dmhs">Delta M.H.S</option>
                                    </Form.Control>

                                    <Form.Label className={"text-bold-black"}>Bubble Color </Form.Label>
                                    <Form.Control name="3" as="select" defaultValue={this.state.axisToMeasure[3]} onChange={this.onChange.bind(this)}>
                                        <option value="vs0">Vertical Support Class 0</option>
                                        <option value="vs1">Vertical Support Class 1</option>
                                        <option value="dmmd">Delta M.M.D</option>
                                        <option value="dmhs">Delta M.H.S</option>
                                    </Form.Control>

                                    <Form.Label className={"text-bold-black"}>Bubble Size </Form.Label>
                                    <Form.Control name="4" as="select" defaultValue={this.state.axisToMeasure[4]} onChange={this.onChange.bind(this)}>
                                        <option value="vs0">Vertical Support Class 0</option>
                                        <option value="vs1">Vertical Support Class 1</option>
                                        <option value="dmmd">Delta M.M.D</option>
                                        <option value="dmhs">Delta M.H.S</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button className={"bg-hugobot fix-margin"} type="submit">
                                    Submit
                                </Button>

                            </Form>

                        </Card.Body>
                    </Card>
                </Modal.Body>

            </Modal>
        );
    }
}

export default PsearchAxisPop;
