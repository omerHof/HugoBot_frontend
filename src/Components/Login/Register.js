import React, { Component } from "react";

import {Button, Container, Form} from "react-bootstrap"

import DegreeSelect from "./DegreeSelect";
import FormElement from "./FormElement";
import '../../resources/style/colors.css';

class Register extends Component{

    handleSubmit = (firstName,lastName,institute,degree,email,pass,cpass) => {
        //check validity on the client side
        if (firstName) {
            let user = {
                "FirstName": firstName,
                "LastName": lastName,
                "Institute": institute,
                "Degree": degree,
                "Email": email,
                "Password": pass,
                "Confirm Password": cpass
            };
        }
        //send http POST to the server with the new user. is he unique?
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
                    <DegreeSelect/>
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