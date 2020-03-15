import React, { Component } from "react";

import {Button, Container, Form} from "react-bootstrap";

import FormElement from "./FormElement";
import history from '../../History';
import { login } from "../../services/authService";
import UserContext from "../../contexts/userContext";

import '../../resources/style/colors.css';

class Login extends Component{
    handleSubmit = async (email,pass) => {
        const user = await login(email, pass);
        this.context.setUser(user);
        history.push('/Home');
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

Login.contextType = UserContext;

export default Login;