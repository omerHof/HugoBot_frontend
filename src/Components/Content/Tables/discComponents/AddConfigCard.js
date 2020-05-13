import React, { Component } from "react";

import {Button, ButtonGroup, Card, Col, Container, Form, Row, ToggleButton} from "react-bootstrap"
import Axios from "axios";

import "../../../../resources/style/colors.css"
import cookies from "js-cookie";
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
    }

    AbMethodOptions = ["Equal Frequency","Equal Width","Persist","KMeans","Knowledge-Based","SAX"];

    optionsToRender = this.AbMethodOptions.map((option) => <option key={option}>{option}</option>);

    getDataOnDataset(id){
        const url = 'http://localhost:80/getDataOnDataset?id='+id;
        const config = {
            headers: {
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }

    handleSubmit = (event) => {

        event.preventDefault();

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
                    this.getDataOnDataset(sessionStorage.getItem("datasetName"))
                        .then((response) => {
                            if (response.status < 400) {
                                let data1= response.data["disc"];
                                let i;
                                let disc= {"rows": []}
                                for (i = 0; i < data1["lengthNum"]; i++) {
                                    let y=data1[parseInt(i)];
                                    disc.rows.push(y)
                                }
                                let data2= response.data["karma"];
                                let j;
                                let karma= {"rows": []}
                                for (j = 0; j < data2["lengthNum"]; j++) {
                                    let w=data2[parseInt(j)];
                                    karma.rows.push(w)
                                }
                                sessionStorage.setItem('DiscretizationTable', JSON.stringify(disc));
                                console.log(karma)
                                sessionStorage.setItem('TIMTable', JSON.stringify(karma));
                                this.forceUpdate();
                                window.alert("karmaLego Created!")
                                //sessionStorage.setItem("allTables",JSON.stringify(myData));
                                //console.log(JSON.parse(sessionStorage.allTables));
                                //window.dispatchEvent(new Event("ReloadHomeTable"));
                            } else {
                                window.alert('there is no such file to download');
                            }
                        });
                    window.alert('Discretization added!');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            })
            .catch(error => console.log(error));

        window.dispatchEvent(new Event("ReloadTable"));
        //this.forceUpdate();
    };

    sendDisc = (PAA,NumStates,InterpolationGap,AbMethod,BinningByValue,KnowledgeBasedFile,GradientFile) => {
        const url = 'http://localhost:80/addNewDisc';
        const formData = new FormData();
        console.log(PAA);
        formData.append('PAA',PAA);
        formData.append('AbMethod',AbMethod);
        formData.append('NumStates',NumStates);
        formData.append('InterpolationGap',InterpolationGap);
        formData.append('BinningByValue',BinningByValue);
        formData.append('KnowledgeBasedFile',KnowledgeBasedFile);
        formData.append('GradientFile',GradientFile);
        formData.append('datasetName',sessionStorage.getItem("datasetName"));
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    onPAAChange = (e) => {
        this.setState({PAA:e.target.value});
    };

    onAbMethodChange = (e) => {
        this.setState({AbMethod:e.target.value,
            KnowledgeBasedFile: (e.target.value.localeCompare("Knowledge-Based") !== 0 ?
                null :
                this.state.KnowledgeBasedFile)});
        if(e.target.value.localeCompare("Knowledge-Based") !== 0)
            document.getElementById("KB-File").value = null;
    };

    onNumStatesChange = (e) => {
        this.setState({NumStates:e.target.value});
    };

    onInterpolationGapChange = (e) => {
        this.setState({InterpolationGap:e.target.value});
    };

    onBinningChange = (e) => {
        this.setState({BinningByValue:"true" === e.target.value,
            GradientFile: (e.target.value.localeCompare("true") === 0 ?
                null :
                this.state.GradientFile)});
        if(e.target.value.localeCompare("true") === 0)
            document.getElementById("Gradient-File").value = null;
    }

    onGradientFileChange = (e) => {
        this.setState({GradientFile:e.target.files[0]});
    }

    onKnowledgeBasedFileChange = (e) => {
        this.setState({KnowledgeBasedFile:e.target.files[0]});
    }

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
                                                      id={"KB-File"}
                                                      type={"file"}
                                                      onChange={this.onKnowledgeBasedFileChange}/>
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
                                                      id={"Gradient-File"}
                                                      type={"file"}
                                                      onChange={this.onGradientFileChange}/>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Container fluid={true}>
                                    <Button className="btn-hugobot" type="submit">
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