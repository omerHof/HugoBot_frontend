import React, { Component } from "react";

import {Button, Container} from "react-bootstrap";

class Visualization extends Component{

    sendVisualRequest = () => {
        window.alert("hello");
    };

    getRequest = () => {
        const request = new XMLHttpRequest();
        // let our_url = 'http://localhost:3000/Home/Visualization/getraz';
        let api_url = 'https://reqres.in/api/users';
        request.open('GET', api_url);
        request.responseType = "json";
        request.onload = () => {
          // const data = JSON.parse(request.response);
          // console.log(data);
          console.log(request.response);
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
            </Container>
        );
    }
}
export default Visualization;