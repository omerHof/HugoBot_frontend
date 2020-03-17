import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Form from "react-bootstrap/Form";

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
        const url = 'http://example.com/file-upload';
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