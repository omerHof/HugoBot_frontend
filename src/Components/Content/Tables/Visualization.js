import React, { Component } from "react";

import {Button, Col, Container} from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";


class Visualization extends Component{

    getUsername = () => {
        const url = 'http://localhost:80/getUserName';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }

    sendVisualRequest = () => {
        const url = 'http://localhost:5000/upload';
        const formData = new FormData();
        formData.append('data_set_name',sessionStorage.getItem("datasetName"));

        this.getUsername()
            .then((response) =>{
                if(response.status < 400){
                    formData.append('username',response.data['Name']);
                    // formData.append('className','class1name');
                    formData.append('timestamp','Years');
                    // formData.append('secondclassName','class0name');
                    // formData.append('comments','no comment');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                // 'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    handleVisualRequest = () => {

        this.getUsername()

        this.sendVisualRequest()
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    window.alert('success!');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
    }

    render() {
        return (
            <Container>
                <Col md={10}>
                    <Button block={true} className={"btn-hugobot"} onClick={this.handleVisualRequest} type={"submit"}>
                        Visualize TIM
                    </Button>
                </Col>
            </Container>
        );
    }
}
export default Visualization;