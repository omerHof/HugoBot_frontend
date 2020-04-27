import React, { Component } from "react";

import {Button, Container} from "react-bootstrap";
import Axios from "axios";


class Visualization extends Component{

    constructor(props){
        super(props);

        this.handleGetAllRequest = this.handleGetAllRequest.bind(this);
    }

    sendVisualRequest = () => {
        window.alert("hello");
    };

    getRequest = () => {
        const request = new XMLHttpRequest();
        // let our_url = 'http://localhost:3000/Home/Visualization/getraz';
        let api_url = 'http://localhost:80/getAllDataSets';
        request.open('GET', api_url);
        request.responseType = "json";
        request.onload = () => {
          // const data = JSON.parse(request.response);
          // console.log(data);
            //request.response
          window.alert("helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
        };
        request.send();
    };

    postRequest = () => {
        const request = new XMLHttpRequest();
        let our_url = 'http://localhost:5000/post';
        request.open('POST', our_url);
        request.responseType = "json";
        request.setRequestHeader('Access-Control-Allow-Origin','*');
        request.setRequestHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = () => {
            if(request.status >= 400) {//client error or server error
                window.alert("zoinks! we have an error " + request.status + "on our hands");
            }
            else{
                // const data = JSON.parse(request.response);
                console.log(request.response);
            }
        };
        request.send({
            username: 'razRazOn',
            email: 'razblafoo@gmail.com',
            password: 'razHasABadPassword123',
        })
    };

    handleGetAllRequest(e){
        e.preventDefault();

        this.getAllDatasets()
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

    getAllDatasets(){
        const url = 'http://localhost:80/getAllDataSets';
        return Axios.get(url);
    }

    render() {
        return (
            <Container>
                <Button className={"btn-hugobot"} onClick={this.sendVisualRequest} type={"submit"}>
                    Visualize TIM
                </Button>
                &nbsp;&nbsp;
                <Button id={"getBtn"} className={"btn-hugobot"}
                        onClick={this.getRequest} type={"submit"}>
                    Send GET request
                </Button>
                &nbsp;&nbsp;
                <Button id={"postBtn"} className={"btn-hugobot"}
                        onClick={this.postRequest} type={"submit"}>
                    Send POST request
                </Button>
                &nbsp;&nbsp;
                <Button id={"getAllMetaBtn"} className={"btn-hugobot"}
                        onClick={this.handleGetAllRequest} type={"submit"}>
                    Get Home Table request
                </Button>
            </Container>
        );
    }
}
export default Visualization;