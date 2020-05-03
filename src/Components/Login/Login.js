import React, { Component } from "react";

import {Button, Container, Form} from "react-bootstrap";

import FormElement from "./FormElement";
import history from '../../History';
import { login } from "../../services/authService";

import '../../resources/style/colors.css';
import Axios from "axios";
import cookies from "js-cookie";

class Login extends Component{

    sendlogIn = (email,pass) => {
        const url = 'http://localhost:80/login';
        const formData = new FormData();
        formData.append('Email',email);
        formData.append('Password',pass);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config);
    };

    handleSubmit = async (email,pass) => {
        this.sendlogIn(
            email,
            pass)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    sessionStorage.setItem("user","true");
                    //this.context.setUser(user);
                    sessionStorage.setItem("dataSets","false");
                    cookies.set('auth-token', response.data['token']);
                    history.push('/Home');
                }
                else{
                    if(response.data['message']=='there is already a user with that Email'){
                        window.alert('there is already a user with that Email')
                    }
                    window.alert('uh oh, there\'s a problem!')
                }
            })
            .catch(error => window.alert(error.response.data['message']));

    };

    render() {
        return (
            <Container fluid={true}>
                <h3>Login</h3>
                <br/>
                <Form>
                    <FormElement name={"Email"} type={"email"}/>
                    <FormElement name={"Password"} type={"password"}/>
                    <Button className={"bg-hugobot"} onClick={() => this.handleSubmit(
                        document.getElementById("Email").value,
                        document.getElementById("Password").value
                    )}
                    >Login</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className={"bg-hugobot"} type={"reset"}>Clear</Button>
                </Form>
                <br/>
                <br/>
            </Container>
        );
    }
}

export default Login;
