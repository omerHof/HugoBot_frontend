import React, { Component } from "react";

import {Col, Container, Row} from "react-bootstrap";
import InfoCard from "./InfoCard";
import StatsCard from "./StatsCard";
import VMapCard from "./VMapCard";
import Axios from "axios";
import cookies from "js-cookie";


class Info extends Component{

    constructor(props){
        super(props);

        this.state={
            DatasetName:"",
            Category:"",
            Owner:"",
            Source:"",
            Description:"",
            Size:"",
            Views:"",
            Downloads:"",
            VMapFile:[]
        };

        this.getInfo(sessionStorage.getItem("datasetName"))
            .then((response) => {
                if (response.status < 400) {
                    this.setState({
                        DatasetName:response.data['Name'],
                        Category:response.data['category'],
                        Owner:response.data['owner_name'],
                        Source:response.data['source'],
                        Description:response.data['Description'],
                        Size:response.data['size'],
                        Views:response.data['views'],
                        Downloads:response.data['downloads']});
                } else {
                    window.alert('uh oh, there\'s a problem!');
                }

            });

        this.getVMapFile(sessionStorage.getItem("datasetName"))
            .then((response) => {
                if (response.status < 400) {
                    let csvRows = response.data.split('\n');
                    let csv = []
                    for(let i = 0; i < csvRows.length; i++) {
                        csv.push(csvRows[i].split(','));
                    }
                    this.setState({
                        VMapFile:csv});
                } else {
                    window.alert('uh oh, there\'s a problem!');
                }

            });
    }

    getInfo = (id) => {
        const url = 'http://localhost:80/getInfo?id='+id;
        const config = {
            headers: {
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
    }

    getVMapFile = (id) => {
        const url = 'http://localhost:80/getVMapFile?id='+id;
        const config = {
            headers: {
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
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
                        <StatsCard
                            Size={this.state.Size}
                            Views={this.state.Views}
                            Downloads={this.state.Downloads}
                        />
                    </Col>
                    <Col md={8}>
                        <VMapCard
                            VMap={this.state.VMapFile}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Info;