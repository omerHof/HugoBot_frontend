import React, { Component } from "react";

import {Button, Container, Form} from "react-bootstrap"

import history from '../../History';

import SelectElement from "./SelectElement";
import FormElement from "./FormElement";
import { register } from "../../services/authService";
import '../../resources/style/colors.css';

class Register extends Component{

    handleSubmit = async (firstName,lastName,institute,degree,email,pass,cpass) => {
        const success = await register(firstName, lastName, institute, degree, email, pass, cpass);
        if (success) {
            history.push('/Login');
        }
    };

    render() {
        return (
            <Container fluid={true}>
                <h3>Register</h3>
                <br/>
                <Form>
                    <FormElement name={"First Name"}/>
                    <FormElement name={"Last Name"}/>
                    <FormElement name={"Institute"}/>
                    <SelectElement name={"Degree"} options={["B.Sc","M.Sc","Ph.D"]} />
                    <FormElement name={"Email"} type={"email"}/>
                    <FormElement name={"Password"} type={"password"}
                                 warningText={" (not your organizational password)"}/>
                    <FormElement name={"Confirm Password"} type={"password"}/>
                    <Button className={"bg-hugobot"} onClick={() => this.handleSubmit(
                        document.getElementById("First Name").value,
                        document.getElementById("Last Name").value,
                        document.getElementById("Institute").value,
                        document.getElementById("Degree").value,
                        document.getElementById("Email").value,
                        document.getElementById("Password").value,
                        document.getElementById("Confirm Password").value
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
export default Register;