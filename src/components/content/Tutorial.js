import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../resources', false, /\.(png|jpe?g|svg)$/));

class Tutorial extends Component{

    render() {
        return (
            <Container fluid={true}>
                <h4> First steps with HugoBot </h4>
                <br/>
                You’re a data scientist and you’ve made significant progress in your research -
                the process of collecting and normalizing data has been completed
                and you’ve decided discretization is the next step prior to learning on your data.
                Luckily, you’ve heard of HugoBot™,
                a web application that services a discretization suite fit for your purposes,
                so now you must register to the website and get approved
                and then format your data according to HugoBot’s™ format.
                <br/>
                <h5> Transitioning between formats</h5>
                For the purposes of demonstration,
                assume you’ve got a dataset measuring the bodily effects of kissing
                and being exposed to your loved one as a function of time,
                where the features are beats per minute, bodily temperature and pupil dilation.
                If we were attempting to predict the subject’s gender according to their reaction,
                we might also have a gender class variable.
                <br/>
                A feasible representation of the data might be as follows:
                <br/>
                <br/>
                <Image src={images[0]}/>
                <br/>
                <br/>
                To transition to HugoBot’s format, we must dissect our data
                and map each feature to its equivalent form in HugoBot’s format.
                <br/>
                <br/>
                A record in HugoBot is composed of the following fields:
                <br/>
                <br/>
                <ListGroup>
                    <ListGroupItem>
                        Entity ID - The ID of the subject, or entity on which the recordings are made. An
                        example could be an individual patient, individual object etc.
                    </ListGroupItem>
                    <ListGroupItem>
                        Temporal Property ID -
                        The ID of the variable that measures the state of a certain feature on the current
                        <br/>
                        An example could be <strong>Patient</strong> (our entity)
                        <strong>Temperature</strong> (our feature).
                    </ListGroupItem>
                    <ListGroupItem>
                        Timestamp - A whole, non-negative number that is used to describe the current time
                        point in which the measurements are made.
                    </ListGroupItem>
                    <ListGroupItem>
                        Temporal Property Value - The current value of the temporal property in our entity
                        at the current timestamp. For example, our patients temperature at time 0 could be
                        36.7 degrees celsius.
                    </ListGroupItem>
                </ListGroup>
                <br/>
                <br/>
                <br/>
                <br/>
            </Container>
        );
    }
}
export default Tutorial;