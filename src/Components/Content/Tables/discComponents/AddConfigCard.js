import React, { Component } from "react";

import {Button, Card, Col, Container, Form, Row} from "react-bootstrap"

import Axios from "axios";
import cookies from "js-cookie";

import "../../../../resources/style/colors.css"

class AddConfigCard extends Component{

    constructor(props) {
        super(props);
        this.state ={
            PAA:"1",
            AbMethod:"Equal Frequency",
            NumStates:"2",
            InterpolationGap:"1",
            Binning:"regular",
            KnowledgeBasedFile:null,
            GradientFile:null
        };
    }

    AbMethodOptions = ["Equal Frequency",
                       "Equal Width",
                       "Persist",
                       "KMeans",
                       "SAX",
                       "Knowledge-Based (by Value)",
                       "Knowledge-Based (by Gradient)"];

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

        this.sendDisc(
            this.state.PAA,
            this.state.NumStates,
            this.state.InterpolationGap,
            this.state.AbMethod,
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
                                sessionStorage.setItem('TIMTable', JSON.stringify(karma));
                                window.dispatchEvent(new Event("ReloadTable"));
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
            .catch(error => window.alert(error.response.data['message']));
    };

    sendDisc = (PAA,NumStates,InterpolationGap,AbMethod,KnowledgeBasedFile,GradientFile) => {
        const url = 'http://localhost:80/addNewDisc';
        const formData = new FormData();
        console.log(PAA);
        formData.append('PAA',PAA);
        formData.append('AbMethod',AbMethod);
        formData.append('NumStates',NumStates);
        formData.append('InterpolationGap',InterpolationGap);
        if(KnowledgeBasedFile !== null && KnowledgeBasedFile !== undefined)
            formData.append('KnowledgeBasedFile',KnowledgeBasedFile);
        if(GradientFile !== null && GradientFile !== undefined)
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

        let bKB = e.target.value.localeCompare("Knowledge-Based (by Value)") === 0;

        let bGrad = e.target.value.localeCompare("Knowledge-Based (by Gradient)") === 0;

        let binning = "regular"
        if(bKB){
            binning = "kbValue";
        }
        else if(bGrad){
            binning = "kbGradient";
        }

        if(bKB || bGrad){
            // reset the regular disc. UI to its defaults (except the abstraction method)
            this.setState({
                // PAA:"1",
                NumStates:"2",
                InterpolationGap:"1"});
            // document.getElementById("PAAInput").value = "";
            document.getElementById("NumStatesInput").value = "";
            document.getElementById("InterpolationInput").value = "";
        }

        //update application state
        this.setState({
            AbMethod:e.target.value,
            Binning: binning,
            KnowledgeBasedFile: !bKB ?
                null :
                this.state.KnowledgeBasedFile,
            GradientFile: !bGrad ?
                null :
                this.state.GradientFile});

        //update UI elements
        if(!bKB)
            document.getElementById("KB-File").value = null;
        if(!bGrad)
            document.getElementById("Gradient-File").value = null;
    };

    onNumStatesChange = (e) => {
        this.setState({NumStates:e.target.value});
    };

    onInterpolationGapChange = (e) => {
        this.setState({InterpolationGap:e.target.value});
    };

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
                                <Col md={5}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Abstraction Method
                                    </Form.Label>
                                    <Form.Control as={"select"}
                                                  id={"AbMethodInput"}
                                                  name={"AbMethodInput"}
                                                  onChange={this.onAbMethodChange}
                                                  placeholder={""}
                                    >
                                        {this.optionsToRender}
                                    </Form.Control>
                                </Col>
                                <Col md={5}>
                                    <Form.Label className={"font-weight-bold"}>
                                        PAA Window Size
                                    </Form.Label>
                                    <Form.Control id={"PAAInput"}
                                                  name={"PAAInput"}
                                                  onChange={this.onPAAChange}
                                                  placeholder={"1"}
                                                  type={"text"}/>
                                    <Form.Text className={"text-muted"}>
                                        Window size must be at least 1
                                    </Form.Text>
                                </Col>
                                <Col md={2}>

                                </Col>
                            </Row>
                            <Row hidden={this.state.Binning.localeCompare("kbValue") !== 0}>
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Knowledge-Based States File
                                    </Form.Label>
                                    <Form.Control accept={".csv"}
                                                  id={"KB-File"}
                                                  type={"file"}
                                                  onChange={this.onKnowledgeBasedFileChange}/>
                                </Col>
                                <Col md={8}>

                                </Col>
                            </Row>
                            <Row hidden={this.state.Binning.localeCompare("kbGradient") !== 0}>
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Gradient File
                                    </Form.Label>
                                    <Form.Control accept={".csv"}
                                                  id={"Gradient-File"}
                                                  type={"file"}
                                                  onChange={this.onGradientFileChange}/>
                                </Col>
                                <Col md={8}>

                                </Col>
                            </Row>
                            <Row hidden={this.state.Binning.localeCompare("regular") !== 0}>
                                <Col md={5}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Number of States
                                    </Form.Label>
                                    <Form.Control id={"NumStatesInput"}
                                                  name={"NumStatesInput"}
                                                  onChange={this.onNumStatesChange}
                                                  placeholder={"2"}
                                                  type={"text"}
                                    />
                                    <Form.Text className={"text-muted"}>
                                        Number of states must be at least 2
                                    </Form.Text>
                                </Col>
                                <Col md={5}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Interpolation Gap
                                    </Form.Label>
                                    <Form.Control id={"InterpolationInput"}
                                                  name={"InterpolationInput"}
                                                  onChange={this.onInterpolationGapChange}
                                                  placeholder={"1"}
                                                  type={"text"}
                                    />
                                    <Form.Text className={"text-muted"}>
                                        Interpolation gap must be at least 1
                                    </Form.Text>
                                </Col>
                                <Col md={2}>

                                </Col>
                            </Row>
                            <Row>
                                <Container fluid={true}>
                                    <Button className={"btn btn-hugobot"}
                                            type={"submit"}>
                                        <i className={"fas fa-play"}/> Run
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