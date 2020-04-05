import React, { Component } from "react";

import {Button, Card, Row} from "react-bootstrap";
import FormElement from "../../Login/FormElement";
import SelectElement from "../../Login/SelectElement";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class Metadata extends Component{

    constructor(props) {
        super(props);
        this.state ={
            datasetName:"def name",
            category:"Medical",
            publicPrivate:"Public",
            description:"def desc",
            datasetSource:"def src",
            file:null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.sendMetadata = this.sendMetadata.bind(this);
    }

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
        })
    }

    sendMetadata(datasetName,category,publicPrivate,file,description,datasetSource){
        const url = 'http://localhost:5000/stepone';//
        const formData = new FormData();
        formData.append('datasetName',datasetName)
        formData.append('category',category);
        formData.append('publicPrivate',publicPrivate);
        formData.append('file',file);
        formData.append('description',description);
        formData.append('datasetSource',datasetSource);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config)
    }

    onCategoryChange(e){
        this.setState({category:e.target.value})
    }

    onFileChange(e){
        this.setState({file:e.target.files[0]})
    }

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
                        <FormElement name={"Dataset Name"} onChange={this.onCategoryChange}/>
                        <SelectElement name={"Category"} options={["Medical","Financial","Psychological","Other"]}/>
                        <SelectElement name={"Public/Private"} options={["Public","Private"]}/>
                        <Row>
                            <Col md={5}>
                                Dataset File <br/>
                                <Form.Control id={"raz123"} accept={".csv"} type={"file"} onChange={this.onFileChange}/>
                            </Col>
                        </Row>
                        <FormElement name={"Description"} as={"textarea"} rows={"5"}/>
                        <FormElement name={"Dataset Source"}/>
                        <Button className={"bg-hugobot"} type={"submit"}>
                            Validate Dataset File and Proceed to Step 2
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className={"bg-hugobot"} type={"reset"}>Clear</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}
export default Metadata;