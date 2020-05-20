import React, { Component } from "react";

import {Button, Card, Col, Form, Row} from "react-bootstrap";

import Axios from "axios";
import cookies from 'js-cookie';

import FormElement from "../../Login/FormElement";
import history from "../../../History"
import SelectElement from "../../Login/SelectElement";

class Metadata extends Component{

    constructor(props) {
        super(props);
        this.state ={
            datasetName:"def name",
            category:"Medical",
            publicPrivate:"Public",
            file:null,
            description:"def desc",
            datasetSource:"def src"
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onDatasetNameChange = this.onDatasetNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onPublicPrivateChange = this.onPublicPrivateChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDatasetSourceChange = this.onDatasetSourceChange.bind(this);
        this.sendMetadata = this.sendMetadata.bind(this);
    }

    //<editor-fold desc="Submit Handlers">
    onFormSubmit(e){
        e.preventDefault();// Stop form submit
        this.sendMetadata(this.state.datasetName,
                          this.state.category,
                          this.state.publicPrivate,
                          this.state.file,
                          this.state.description,
                          this.state.datasetSource)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    history.push('/Upload/VMap');
                    sessionStorage.setItem('datasetName',this.state.datasetName);
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }

        })
        .catch(error => {
            window.alert(error.response.data["message"]);
        });
    };

    sendMetadata(datasetName,category,publicPrivate,file,description,datasetSource){
        const url = 'http://localhost:80/stepone';
        const formData = new FormData();
        formData.append('datasetName',datasetName);
        formData.append('category',category);
        formData.append('publicPrivate',publicPrivate);
        formData.append('file',file);
        formData.append('description',description);
        formData.append('datasetSource',datasetSource);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config)
    };
    //</editor-fold>

    //<editor-fold desc="onChange Event Listeners">
    onCategoryChange(e){
        this.setState({category:e.target.value})
    }

    onDatasetNameChange(e){
        this.setState({datasetName:e.target.value})
    }

    onPublicPrivateChange(e){
        this.setState({publicPrivate:e.target.value})
    }

    onDescriptionChange(e){
        this.setState({description:e.target.value})
    }

    onDatasetSourceChange(e){
        this.setState({datasetSource:e.target.value})
    }

    onFileChange(e){
        this.setState({file:e.target.files[0]})
    }
    //</editor-fold>

    render() {
        return (
            <Card>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Dataset
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onFormSubmit}>
                        <FormElement name={"Dataset Name"}
                                     onChange={this.onDatasetNameChange}
                                     value={this.state.datasetName}
                        />
                        <SelectElement name={"Category"}
                                       onChange={this.onCategoryChange}
                                       options={["Medical","Financial","Psychological","Other"]}
                                       value={this.state.category}
                        />
                        <SelectElement name={"Public/Private"}
                                       onChange={this.onPublicPrivateChange}
                                       options={["Public","Private"]}
                                       value={this.state.publicPrivate}
                        />
                        <Row>
                            <Col md={5}>
                                Dataset File <br/>
                                <Form.Control accept={".csv"} type={"file"} onChange={this.onFileChange}/>
                            </Col>
                        </Row>
                        <FormElement as={"textarea"}
                                     name={"Description"}
                                     onChange={this.onDescriptionChange}
                                     rows={"5"}
                                     value={this.state.description}
                        />
                        <FormElement name={"Dataset Source"}
                                     onChange={this.onDatasetSourceChange}
                                     value={this.state.datasetSource}
                        />
                        <Button className={"bg-hugobot"} type={"submit"}>
                            Validate Dataset File and Proceed to Step 2
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        {/*<Button className={"bg-hugobot"} type={"submit"}>*/}
                        {/*    Validate Dataset File and Proceed to Step 2 with Temporal Windows Creation Data*/}
                        {/*</Button>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        {/*should link to WindowCreation.html*/}
                        <Button className={"bg-hugobot"} type={"reset"}>Clear</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}
export default Metadata;