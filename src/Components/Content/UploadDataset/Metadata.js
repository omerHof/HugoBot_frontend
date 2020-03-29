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
            file:null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault();// Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = 'http://example.com/file-upload';//
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config)
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
                        <FormElement name={"Dataset Name"}/>
                        <SelectElement name={"Category"} options={["Medical","Financial","Psychological","Other"]}/>
                        <SelectElement name={"Public/Private"} options={["Public","Private"]}/>
                        <Row>
                            <Col md={5}>
                                Dataset File <br/>
                                <Form.Control id={"raz123"} accept={".csv"} type={"file"} onChange={this.onChange}/>
                            </Col>
                        </Row>
                        <FormElement name={"Description"} as={"textarea"} rows={"5"}/>
                        <FormElement name={"Dataset Source"}/>
                        <Button className={"bg-hugobot"}>
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