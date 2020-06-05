import React, { Component } from "react";

import {Button, Card, Col, Container, Form, Row} from "react-bootstrap"

import Axios from "axios";
import cookies from "js-cookie";

import "../../../../resources/style/colors.css"

/**
 * this class is responsible for uploading and downloading the data about the discretization.
 * if you upload the discretization you can do it by knowledge based or by grdient file or by regular way.
 * it also gets, interpolation gap, paa window size, number of bins and method of dicretization
 */

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
            GradientFile:null,
            GradientWindowSize: "2"
        };
    }

    AbMethodOptions = [
        "Equal Frequency",
        "Equal Width",
        "Persist",
        "KMeans",
        "SAX",
        "Knowledge-Based",
        "Gradient",
        'TD4C-Cosine',
        'TD4C-Diffmax',
        'TD4C-Diffsum',
        'TD4C-Entropy',
        'TD4C-Entropy-IG',
        'TD4C-SKL'
    ];

    optionsToRender = this.AbMethodOptions.map((option) => <option key={option}>{option}</option>);

    getDataOnDataset(id){
        const url = '/api/getDataOnDataset?id='+id;
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
            this.state.GradientFile,
            this.state.GradientWindowSize)
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
                            }
                            else {
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

    sendDisc = (PAA,NumStates,InterpolationGap,AbMethod,KnowledgeBasedFile,GradientFile,GradientWindowSize) => {
        const url = '/api/addNewDisc';
        const formData = new FormData();
        formData.append('AbMethod',AbMethod);
        formData.append('PAA',PAA);
        formData.append('InterpolationGap',InterpolationGap);
        if(this.state.Binning.localeCompare("regular") === 0){
            formData.append('NumStates',NumStates);
        }
        else if(this.state.Binning.localeCompare("kbGradient") === 0){
            formData.append('GradientFile',GradientFile);
            formData.append('GradientWindowSize',GradientWindowSize);
        }
        else if(this.state.Binning.localeCompare("kbValue") === 0) {
            formData.append('KnowledgeBasedFile', KnowledgeBasedFile);
        }
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

        let bKB = e.target.value.localeCompare("Knowledge-Based") === 0;

        let bGrad = e.target.value.localeCompare("Gradient") === 0;

        let binning;

        if(bKB){
            binning = "kbValue";
        }
        else if(bGrad) {
            binning = "kbGradient";
        }
        else{
            binning = "regular"
        }

        //update application state
        this.setState({
            AbMethod:e.target.value,
            Binning: binning,
            KnowledgeBasedFile: !bKB ? null : this.state.KnowledgeBasedFile,
            GradientFile: !bGrad ? null : this.state.GradientFile,
            GradientWindowSize: !bGrad ? "2" : this.state.GradientWindowSize,
            NumStates: (bKB || bGrad) ? "2" : this.state.NumStates
        });

        //update UI elements
        if(!bKB)
            document.getElementById("KB-File").value = null;
        if(!bGrad)
            document.getElementById("Gradient-File").value = null;
            document.getElementById("GradientWindowInput").value = null;

        if(bKB || bGrad){
            // reset the regular disc. UI to its defaults
            document.getElementById("NumStatesInput").value = "";
        }
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

    onGradientWindowSizeChange = (e) => {
        this.setState({GradientWindowSize:e.target.value});
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
                                    <div hidden={this.state.Binning.localeCompare("kbGradient") !== 0}>
                                        <br/>
                                        <Form.Text className={"text-muted"}>
                                            NOTE: Gradient discretizations can take a while
                                        </Form.Text>
                                    </div>
                                </Col>
                                <Col md={4}>
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
                                <Col md={4}>
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
                                <Col md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Gradient Window Size
                                    </Form.Label>
                                    <Form.Control id={"GradientWindowInput"}
                                                  name={"GradientWindowInput"}
                                                  onChange={this.onGradientWindowSizeChange}
                                                  placeholder={"2"}
                                                  type={"text"}/>
                                    <Form.Text className={"text-muted"}>
                                        Window size must be at least 2
                                    </Form.Text>
                                </Col>
                                <Col md={4}>

                                </Col>
                            </Row>
                            <Row>
                                <Col hidden={this.state.Binning.localeCompare("kbValue") !== 0} md={4}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Knowledge-Based States File
                                    </Form.Label>
                                    <Form.Control accept={".csv"}
                                                  id={"KB-File"}
                                                  type={"file"}
                                                  onChange={this.onKnowledgeBasedFileChange}/>
                                </Col>
                                <Col hidden={this.state.Binning.localeCompare("regular") !== 0} md={4}>
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