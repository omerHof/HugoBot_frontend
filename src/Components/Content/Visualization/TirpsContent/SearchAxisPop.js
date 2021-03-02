import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import {Card, Form, Row,Button,Col} from "react-bootstrap";
// import WeightsForm from "./WeightsForm";

class SearchAxisPop extends Component {
    state = {
        "vs": 1,    
        "mhs": 2,   
        "mmd": 3,   
    };

    constructor(props) {
        super(props);
    } 

    onSubmit = (event) => {
        event.preventDefault();
        //check

        this.props.onUpdate(this.state.vs, this.state.mhs, this.state.mmd);
        this.props.onHide(true)
    }
    
    onChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        if (Number(name)){
          name = Number(name);
          this.setState({[val]: name}); 
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
                    {/* <WeightsForm onUpdate={this.changeWeightsValue2} /> */}
                    <Card>
                        <Card.Header className={"bg-hugobot"}>
                            <Card.Text className={"text-hugobot text-hugoob-advanced"}>
                                Select Axis{" "}
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>

                            <Form onSubmit={this.onSubmit}>
                                <Row>
                                    <Col >
                                        <Form.Label className={"text-bold-black"} >X Axis</Form.Label>
                                        <Form.Control name="1" as="select" onChange={this.onChange}>
                                            <option value="vs">Vertical Support</option>
                                            <option value="mhs">Mean Horizontal Support</option>
                                            <option value="mmd">Mean Mean Duration</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label className={"text-bold-black fat_label"}>Y Axis </Form.Label>
                                        <Form.Control name="2" as="select" onChange={this.onChange}>
                                            <option value="vs">Vertical Support</option>
                                            <option value="mhs">Mean Horizontal Support</option>
                                            <option value="mmd">Mean Mean Duration</option>
                                        </Form.Control>
                                    </Col>
                                    <Col className={"margin_it"}>
                                        <Form.Label className={"text-bold-black"}>Bubble Color </Form.Label>
                                        <Form.Control name="3" as="select" onChange={this.onChange}>
                                            <option value="vs">Vertical Support</option>
                                            <option value="mhs">Mean Horizontal Support</option>
                                            <option value="mmd">Mean Mean Duration</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Button className={"bg-hugobot fix-margin"} type="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </Card.Body>
                    </Card>
                </Modal.Body>

            </Modal>
        );
    }
}

export default SearchAxisPop;
