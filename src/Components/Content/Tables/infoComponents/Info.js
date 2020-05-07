import React, { Component } from "react";

import {Col, Container, Row} from "react-bootstrap";
import InfoCard from "./InfoCard";
import StatsCard from "./StatsCard";
import VMapCard from "./VMapCard";
import Axios from "axios";


class Info extends Component{

    constructor(props){
        super(props);

        this.state={
            DatasetName:"",
            Category:"",
            Owner:"",
            Source:"",
            Description:""
        };

        this.getAllInfoOnDataset(sessionStorage.getItem("datasetName"))
            .then((response) => {
                if (response.status < 400) {
                    window.alert('success!');
                    console.log(response.data);
                    this.setState({
                        DatasetName:response.data['dataset'],
                        Category:response.data['category'],
                        Owner:response.data['owner'],
                        Source:response.data['source'],
                        Description:response.data['desc']});
                } else {
                    window.alert('uh oh, there\'s a problem!');
                }

            });
    }

    getAllInfoOnDataset = (id) => {
        const url = 'http://localhost:80/getAllInfoOnDataset?id='+id;
        return Axios.get(url);
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col md={4}>
                        <InfoCard
                            DatasetName={this.state.DatasetName}
                            Category={this.state.Category}
                            Owner={this.state.Owner}
                            Source={this.state.Source}
                            Description={this.state.Description}
                        />
                        <StatsCard/>
                    </Col>
                    <Col md={8}>
                        <VMapCard/>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Info;