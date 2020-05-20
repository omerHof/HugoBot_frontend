import React, { Component } from "react";

import {Button, Card, Form} from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";

import history from "../../../History";

class EntitiesFile extends Component{

    constructor(props) {
        super(props);
        this.state ={
            file:null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    onFormSubmit(e){
        e.preventDefault();// Stop form submit
        let datasetName = sessionStorage.getItem('datasetName');
        this.fileUpload(this.state.file,datasetName)
            .then((response)=>{
                window.alert(response.data['message'])
                sessionStorage.setItem("datasetUploaded", "true");
                window.dispatchEvent(new Event("ReloadTableContent"));
                history.push("/Home");
        })
        .catch(error => {
            window.alert(error.response.data["message"]);
        });
    }

    fileUpload(file,datasetName){
        const url = 'http://localhost:80/stepthree';
        const formData = new FormData();
        formData.append('file',file);
        formData.append('datasetName',datasetName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
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
                        Entities:
                        <Form.Control accept={".csv"} type={"file"} onChange={this.onChange}/>
                        <br/><br/>
                        <Button className={"btn btn-hugobot"} type="submit">Finish & Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}
export default EntitiesFile;