import React, { Component } from "react";

import {Button, Container, Form} from "react-bootstrap";

import FormElement from "./FormElement";
import '../../resources/style/colors.css';

class Login extends Component{
    handleSubmit = (email,pass) => {
        //check validity on the client side
        if (email && pass) {
            let user = {
                "Email": email,
                "Password": pass
            };
        }
        //send http POST to the server with the new user. does he exist?
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
                    >Register</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className={"bg-hugobot"} type={"reset"}>Clear</Button>
                </Form>
                <br/>
                <br/>
            </Container>
        );
    }
}
export default Login;