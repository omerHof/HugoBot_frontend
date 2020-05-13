import React, { Component } from "react";

import {Button, Col, Container} from "react-bootstrap";

import Axios from "axios";
// import cookies from "js-cookie";


class Visualization extends Component{

    sendVisualRequest = () => {
        const url = 'http://localhost:5000/upload';
        const formData = new FormData();
        formData.append('data_set_name',sessionStorage.getItem("datasetName"));
        formData.append('username',"a");// ask yonatan @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        formData.append('className','0');// change to real value
        formData.append('timestamp','0');// ask the manual @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        formData.append('secondclassName','0');// huh
        formData.append('comments','0');// huh #2

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                // 'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    handleVisualRequest = () => {
        this.sendVisualRequest()
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    window.alert('success!get');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
    }

    render() {
        return (
            <Container>
                <Col md={4}>

                </Col>
                <Col md={4}>
                    <Button className={"btn-hugobot"} onClick={this.handleVisualRequest} type={"submit"}>
                        Visualize TIM
                    </Button>
                </Col>
                <Col md={4}>
                </Col>
            </Container>
        );
    }
}
export default Visualization;