import React, { Component } from "react";

import {Button, Container, Form} from "react-bootstrap"

import Axios from "axios";

import FormElement from "./FormElement";
import history from '../../History';
import SelectElement from "./SelectElement";
import '../../resources/style/colors.css';
// import { register } from "../../services/authService";

class Register extends Component{


    sendRegistration = (firstName, lastName, institute, degree, email, pass) => {
        const url = 'http://localhost:80/register';
        const formData = new FormData();
        formData.append('Fname',firstName);
        formData.append('Email',email);
        formData.append('Institute',institute);
        formData.append('Degree',degree);
        formData.append('Lname',lastName);
        formData.append('Password',pass);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config);
    };


    handleSubmit = (firstName,lastName,institute,degree,email,pass,cpass) => {
        if (institute==="" || firstName==="" || lastName==="" || degree==="" || email==="" ||pass==="" || cpass===""){
            window.alert("one or more of the arguments is missing")
        }
        else{
            if (pass!==cpass){
                window.alert("passwords different")
            }
            else {
                this.sendRegistration(firstName,
                    lastName,
                    institute,
                    degree,
                    email,
                    pass)
                    .then((response)=>{
                        console.log(response.data);
                        if(response.status < 400){
                            console.log("|juiglivgbilyh")
                            window.alert('success!');
                            history.push('/Login');
                        }
                        else{
                            if(response.data['message'] === 'there is already a user with that Email'){
                                window.alert('there is already a user with that Email')
                            }
                            window.alert('uh oh, there\'s a problem!')
                        }
                    })
                    .catch(error => window.alert(error.response.data['message']));
            }

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