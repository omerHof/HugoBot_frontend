import React, { Component } from "react";

import {Button, Card, Col, Container, Form, Row} from "react-bootstrap"

import Axios from "axios";
import cookies from "js-cookie";
import "../../../../resources/style/colors.css";

// import "../../../resources/style/colors.css";

/**
 * this class is responsible for uploading and downloading the data about the discretization.
 * if you upload the discretization you can do it by knowledge based or by grdient file or by regular way.
 * it also gets, interpolation gap, paa window size, number of bins and method of dicretization
 */

class DatasetInfo extends Component{

    constructor(props) {
        super(props);
        this.datasetInfo = []
        this.getDataOnDataset(window.selcetedDataSet).then((response) => {
            this.datasetInfo = response.data['DataSets'];
        }).then(console.log(this.dataSetInfo[0]))
    
        this.state ={
            DataSetName:"1",
            UserName:"1",
            ClassName:"2",
            InterpolationGap:"1",
            StateName:"regular",
            EntitiesName:null,
        };
    }

    granularityOptions = [
        "Years",
        "Months",
        "Days",
        "Hours",
        "Minutes",
        "Seconds",
    ];

    optionsToRender = this.granularityOptions.map((option) => <option key={option}>{option}</option>);

    getDataOnDataset (id) {
        const url = window.base_url+ "/getDataSets"
        let body = {
            data_set_name: id,
        }
        const formData = new FormData();
    // formData.append("file", file);
        formData.append("data_set_name", id);
        const config = {
            headers: {
            "content-type": "multipart/form-data",
            "x-access-token": cookies.get("auth-token"),
            },
        };
    return Axios.post(url, formData, config);
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
        const url = window.base_url +'/addNewDisc';
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


    render() {
        return (
            <Card style={{ width: 'auto' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        DataSet information 
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Container fluid={true}>
                            <Row>
                                <Col md={6}>
                                    <Form.Label className={"font-weight-bold"}>
                                      DataSet Name
                                    </Form.Label>
                                    <Form.Control id={"DataSetName"}
                                                  name={"DataSetName"}
                                                  placeholder={this.state.DataSetName}/>
                                </Col>
                                <Col md={6}>
                                    <Form.Label className={"font-weight-bold"}>
                                        User Name
                                    </Form.Label>
                                    <Form.Control id={"UserName"}
                                                  name={"UserName"}
                                                  placeholder={"1"}
                                                  type={"text"}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label className={"font-weight-bold"}>
                                      Class Name
                                    </Form.Label>
                                    <Form.Control id={"ClassName"}
                                                  name={"ClassName"}
                                                  placeholder={"1"}
                                                  type={"text"}/>
                                </Col>
                                <Col md={6}>
                                <Form.Label className={"font-weight-bold"}>
                                      Maximal granularity
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
                              </Row>
                              <Row>
                                <Col md={6}>
                                    <Form.Label className={"font-weight-bold"}>
                                      State File Name
                                    </Form.Label>
                                    <Form.Control id={"StateName"}
                                                  name={"StateName"}
                                                  placeholder={""}/>
                                </Col>
                                <Col md={6}>
                                    <Form.Label className={"font-weight-bold"}>
                                        Entities File Name
                                    </Form.Label>
                                    <Form.Control id={"EntitiesName"}
                                                  name={"EntitiesName"}
                                                  placeholder={"1"}
                                                  type={"text"}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label className={"font-weight-bold"}>
                                      Class 0 Name
                                    </Form.Label>
                                    <Form.Control id={"Class0Name"}
                                                  name={"Class0Name"}
                                                  placeholder={""}/>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>
        );
    };
}
export default DatasetInfo;