import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

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
            </Container>
        );
    }
}
export default Tutorial;