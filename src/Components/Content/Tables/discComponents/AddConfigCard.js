import React, { Component } from "react";

import {Button, ButtonGroup, Card, Col, Container, Form, Row, ToggleButton} from "react-bootstrap"
import Axios from "axios";

import "../../../../resources/style/colors.css"
// import {fireEvent} from "@testing-library/react";
// import triggerBrowserReflow from "react-bootstrap/cjs/triggerBrowserReflow";

class AddConfigCard extends Component{

    constructor(props) {
        super(props);
        this.state ={
            PAA:"1",
            AbMethod:"Equal Frequency",
            NumStates:"2",
            InterpolationGap:"1",
            BinningByValue:true,
            KnowledgeBasedFile:null,
            GradientFile:null
        };

        //<editor-fold desc="Bindings">
        this.onPAAChange = this.onPAAChange.bind(this);
        this.onAbMethodChange = this.onAbMethodChange.bind(this);
        this.onNumStatesChange = this.onNumStatesChange.bind(this);
        this.onInterpolationGapChange = this.onInterpolationGapChange.bind(this);
        this.onBinningChange = this.onBinningChange.bind(this);
        this.onGradientFileChange = this.onGradientFileChange.bind(this);
        this.onKnowledgeBasedFileChange = this.onKnowledgeBasedFileChange.bind(this);

        this.HeadElement = this.HeadElement.bind(this);
        this.PAAElement = this.PAAElement.bind(this);
        this.AbMethodNumStatesElement = this.AbMethodNumStatesElement.bind(this);
        this.InterpolationElement = this.InterpolationElement.bind(this);
        this.ConfigurationForm = this.ConfigurationForm.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendDisc = this.sendDisc.bind(this);
        //</editor-fold>
    }

    handleSubmit = (event) => {

        event.preventDefault();

        let x= JSON.parse(sessionStorage.DiscretizationTable);

        let y={
            "MethodOfDiscretization": this.state.AbMethod,
            "BinsNumber": this.state.NumStates,
            "InterpolationGap": this.state.InterpolationGap,
            "PAAWindowSize": this.state.PAA
        };

        x.rows.push(y);

        this.sendDisc(this.state.PAA,
                      this.state.NumStates,
                      this.state.InterpolationGap,
                      this.state.AbMethod,
                      this.state.BinningByValue,
                      this.state.KnowledgeBasedFile,
                      this.state.GradientFile)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    window.alert('success!');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });

        sessionStorage.setItem('DiscretizationTable', JSON.stringify(x));

        window.dispatchEvent(new Event("ReloadTable"));
        //this.forceUpdate();
    };

    sendDisc(PAA,NumStates,InterpolationGap,AbMethod,BinningByValue,KnowledgeBasedFile,GradientFile){
        const url = 'http://localhost:5000/addNewDisc';
        const formData = new FormData();
        formData.append('PAA',PAA);
        formData.append('AbMethod',AbMethod);
        formData.append('NumStates',NumStates);
        formData.append('InterpolationGap',InterpolationGap);
        formData.append('BinningByValue',BinningByValue);
        formData.append('KnowledgeBasedFile',KnowledgeBasedFile);
        formData.append('GradientFile',GradientFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config);
    };

    //<editor-fold desc="Sub-Components">
    HeadElement(){
        return(
            <Card.Header className={"bg-hugobot"}>
                <Card.Text className={"text-hugobot"}>
                    Add a New Configuration
                </Card.Text>
            </Card.Header>
        );
    };

    onPAAChange(e){
        this.setState({PAA:e.target.value});
    };

    PAAElement(){
        return(
            <Card>
                <Card.Body>
                    <Form.Label className={"font-weight-bold"}>
                        PAA Window Size
                    </Form.Label>
                    <Form.Control name="PAAInput"
                                  onChange={this.onPAAChange}
                                  placeholder="1"
                                  type={"text"}/>
                    <Form.Text className="text-muted">
                        Window size must be at least 1
                    </Form.Text>


                </Card.Body>
            </Card>
        );
    };

    AbMethodOptions = ["Equal Frequency","Equal Width","Persist","KMeans","Knowledge-Based","SAX"];

    optionsToRender = this.AbMethodOptions.map((option) => <option>{option}</option>);

    onAbMethodChange(e){
        this.setState({AbMethod:e.target.value});
    };

    onNumStatesChange(e){
        this.setState({NumStates:e.target.value});
    };

    AbMethodNumStatesElement(){
        return(
            <Card>
                <Card.Body>
                    <Form.Label className={"font-weight-bold"}>
                        Abstraction Method
                    </Form.Label>
                    <Form.Control as={"select"}
                                  name="AbMethodInput"
                                  onChange={this.onAbMethodChange}
                                  placeholder=""
                    >
                        {this.optionsToRender}
                    </Form.Control>

                    <Form.Label className={"font-weight-bold"}>
                        Number of States
                    </Form.Label>
                    <Form.Control name="NumStatesInput"
                                  onChange={this.onNumStatesChange}
                                  placeholder="2"
                                  type={"text"}
                    />
                    <Form.Text className="text-muted">
                        Number of states must be at least 2
                    </Form.Text>
                </Card.Body>
            </Card>
        );
    };

    onInterpolationGapChange(e){
        this.setState({InterpolationGap:e.target.value});
    };

    InterpolationElement(){
        return(
            <Card>
                <Card.Body>
                    <Form.Label className={"font-weight-bold"}>
                        Interpolation Gap
                    </Form.Label>
                    <Form.Control name="InterpolationInput"
                                  onChange={this.onInterpolationGapChange}
                                  placeholder="1"
                                  type={"text"}
                    />
                    <Form.Text className="text-muted">
                        Interpolation gap must be at least 1
                    </Form.Text>
                </Card.Body>
            </Card>
        );
    };

    onBinningChange(e){
        this.setState({BinningByValue:"true" === e.target.value});
    }

    onGradientFileChange(e){
        this.setState({GradientFile:e.target.files[0]});
    }

    onKnowledgeBasedFileChange(e){
        this.setState({KnowledgeBasedFile:e.target.files[0]});
    }

    ConfigurationForm(){
        return(
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
                    <Row className={"justify-Content-center"}>
                        <Button className="bg-hugobot" type="submit">
                            <i className="fas fa-plus"/> Add Configuration
                        </Button>
                    </Row>
                </Container>
            </Form>
        );
    };
    //</editor-fold>

    render() {
        return (
            <Card style={{ width: 'auto' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Add a New Configuration
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Container fluid={true}>
                            <Row>
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        PAA Window Size
                                    </Form.Label>
                                    <Form.Control name="PAAInput"
                                                  onChange={this.onPAAChange}
                                                  placeholder="1"
                                                  type={"text"}/>
                                    <Form.Text className="text-muted">
                                        Window size must be at least 1
                                    </Form.Text>
                                </Col>
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Number of States
                                    </Form.Label>
                                    <Form.Control name="NumStatesInput"
                                                  onChange={this.onNumStatesChange}
                                                  placeholder="2"
                                                  type={"text"}
                                    />
                                    <Form.Text className="text-muted">
                                        Number of states must be at least 2
                                    </Form.Text>
                                </Col>
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Interpolation Gap
                                    </Form.Label>
                                    <Form.Control name="InterpolationInput"
                                                  onChange={this.onInterpolationGapChange}
                                                  placeholder="1"
                                                  type={"text"}
                                    />
                                    <Form.Text className="text-muted">
                                        Interpolation gap must be at least 1
                                    </Form.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Abstraction Method
                                    </Form.Label>
                                    <Form.Control as={"select"}
                                                  name="AbMethodInput"
                                                  onChange={this.onAbMethodChange}
                                                  placeholder=""
                                    >
                                        {this.optionsToRender}
                                    </Form.Control>
                                </Col>
                                <Col md={3}>

                                </Col>
                                <Col md={5}>
                                    <Row hidden={this.state.AbMethod.localeCompare("Knowledge-Based") !== 0}>
                                        <Form.Label className={"font-weight-bold"}>
                                            Knowledge-Based States File
                                        </Form.Label>
                                        <Form.Control accept={".csv"}
                                                      type={"file"}
                                                      onChange={this.onGradientFileChange}/>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={7}>
                                    <ButtonGroup toggle={true} >
                                        <ToggleButton checked={this.state.BinningByValue}
                                                      className={"btn-hugobot"}
                                                      onChange={this.onBinningChange}
                                                      type={"radio"}
                                                      value={true}>
                                            Bin by Value
                                        </ToggleButton>
                                        <ToggleButton checked={!this.state.BinningByValue}
                                                      className={"btn-hugobot"}
                                                      onChange={this.onBinningChange}
                                                      type={"radio"}
                                                      value={false}>
                                            Bin by Gradient
                                        </ToggleButton>
                                    </ButtonGroup>
                                </Col>
                                <Col md={5}>
                                    <Row hidden={this.state.BinningByValue}>
                                        <Form.Label className={"font-weight-bold"}>
                                            Gradient File
                                        </Form.Label>
                                        <Form.Control accept={".csv"}
                                                      type={"file"}
                                                      onChange={this.onGradientFileChange}/>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Container fluid={true}>
                                    <Button className="bg-hugobot" type="submit">
                                        <i className="fas fa-plus"/> Add Configuration
                                    </Button>
                                </Container>
                            </Row>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>
        );
    };
}
export default AddConfigCard;