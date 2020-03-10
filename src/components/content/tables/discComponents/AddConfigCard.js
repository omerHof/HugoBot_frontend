import React, { Component } from "react";
import {Container, Row, Col, Form, Card, Button} from "react-bootstrap"
import "../../../layout/colors.css"
// import {fireEvent} from "@testing-library/react";
// import triggerBrowserReflow from "react-bootstrap/cjs/triggerBrowserReflow";

class AddConfigCard extends Component{

    handleSubmit = (event) => {

        event.preventDefault();

        let x= JSON.parse(sessionStorage.DiscretizationTable);

        let y={
            "MethodOfDiscretization": event.target.AbMethodInput.value,
            "BinsNumber": event.target.NumStatesInput.value,
            "InterpolationGap": event.target.InterpolationInput.value,
            "PAAWindowSize": event.target.PAAInput.value
        };

        x.rows.push(y);

        sessionStorage.setItem('DiscretizationTable', JSON.stringify(x));

        window.dispatchEvent(new Event("ReloadTable"));
        //this.forceUpdate();
    };



    //<editor-fold desc="Sub-components">

    HeadElement = (
        <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>
                Add a New Configuration
            </Card.Text>
        </Card.Header>
    );

    PAAElement = (
        <Card>
            <Card.Body>
                <Form.Label className={"font-weight-bold"}>
                    PAA Window Size
                </Form.Label>
                <Form.Control name="PAAInput" type={"text"} placeholder="1" />
                <Form.Text className="text-muted">
                    Window size must be at least 1
                </Form.Text>
            </Card.Body>
        </Card>
    );

    AbMethodNumStatesElement = (
        <Card>
            <Card.Body>
                <Form.Label className={"font-weight-bold"}>
                    Abstraction Method
                </Form.Label>
                <Form.Control name="AbMethodInput" type={"text"} placeholder="" />
                <Form.Label className={"font-weight-bold"}>
                    Number of States
                </Form.Label>
                <Form.Control name="NumStatesInput" type={"text"} placeholder="2" />
                <Form.Text className="text-muted">
                    Number of states must be at least 2
                </Form.Text>
            </Card.Body>
        </Card>
    );

    InterpolationElement = (
        <Card>
            <Card.Body>
                <Form.Label className={"font-weight-bold"}>
                    Interpolation Gap
                </Form.Label>
                <Form.Control name="InterpolationInput" type={"text"} placeholder="1" />
                <Form.Text className="text-muted">
                    Interpolation gap must be at least 1
                </Form.Text>
            </Card.Body>
        </Card>
    );

    ConfigurationForm = (
        <Form onSubmit={this.handleSubmit}>
            <Container fluid={true}>
                <Form.Row>
                    <Col md={4}>
                        {this.PAAElement}
                    </Col>
                    <Col md={4}>
                        {this.AbMethodNumStatesElement}
                    </Col>
                    <Col md={4}>
                        {this.InterpolationElement}
                    </Col>
                </Form.Row>
                <Row className={"justify-content-center"}>
                    <Button className="bg-hugobot" type="submit">
                        <i className="fas fa-plus"/> Add Configuration
                    </Button>
                </Row>
            </Container>
        </Form>
    );
    //</editor-fold>

    render() {
        return (
            <Card style={{ width: 'auto' }}>
                {this.HeadElement}
                <Card.Body>
                    {this.ConfigurationForm}
                </Card.Body>
            </Card>
        );
    }
}
export default AddConfigCard;