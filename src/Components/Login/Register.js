import React, { Component } from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import '../../resources/style/colors.css';

function FormElement(props) {
    return(
        <Row>
            <Col md={5}>
                {props.name} {props.warningText}
                {/*<Form.Text className={"text-danger"}>*/}
                {/*    {props.warningText}*/}
                {/*</Form.Text>*/}
                <Form.Control id={props.name} type={props.type}/>
            </Col>
            <Col md={7}>
                {/*feedback*/}
            </Col>
        </Row>
    )
}

FormElement.defaultProps = {
    type:"text"
};

function DegreeSelect() {
    return(
        <Row>
            <Col md={4}>
                <Form.Text>
                    Degree
                </Form.Text><br/>
                <select id={"Degree"} className={"form-control"}>
                    <option>B.Sc</option>
                    <option>M.Sc</option>
                    <option>Ph.D</option>
                </select>
            </Col>
            <Col md={8}>
                {/*feedback*/}
            </Col>
        </Row>
    )
}

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