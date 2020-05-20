import React, { Component } from "react";

import {Button, Col, Container, Row} from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";


class Visualization extends Component{

    constructor(props) {
        super(props);

        this.state={
            data_set_name:'',
            username:'',
            output:null,
            timestamp:'Years',
            rawData:null,
            states:null
        }

        let datasetName = sessionStorage.getItem("datasetName");
        let disc_id = sessionStorage.getItem("currDisc");
        // let kl_id = sessionStorage.getItem("currKL");

        this.getUsername().then((UsernameResponse) => {
            this.getRawDataFile(datasetName).then((RawDataResponse) => {
                this.getStatesFile(datasetName,disc_id).then((StatesResponse) => {
                    this.getKLOutput(datasetName,disc_id).then((KLResponse) => {
                        if(UsernameResponse.status < 400 &&
                            RawDataResponse.status < 400 &&
                            StatesResponse.status < 400 &&
                            KLResponse.status < 400)
                        {
                            this.setState({
                                data_set_name:datasetName,
                                username:UsernameResponse.data['Name'],
                                output:KLResponse.data,
                                timestamp:"Years",
                                rawData:RawDataResponse.data,
                                states:StatesResponse.data
                            });
                        }
                        else{
                            window.alert('uh oh, there\'s a problem!');
                        }
                    });
                });
            });
        });
    }

    getUsername = () => {
        const url = 'http://localhost:80/getUserName';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }

    getRawDataFile = (dataset_name) => {
        const url = 'http://localhost:80/getRawDataFile?id=' + dataset_name;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }

    getStatesFile = (dataset_name,disc_id) =>{
        const url = 'http://localhost:80/getStatesFile?dataset_id=' + dataset_name + '&disc_id=' + disc_id;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }

    getKLOutput = (dataset_name,disc_id) => {
        const url = 'http://localhost:80/getKLOutput?dataset_id=' + dataset_name + '&disc_id=' + disc_id;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }

    sendVisualRequest = () => {
        const url = 'http://localhost:5000/upload';
        const formData = new FormData();

        formData.append('data_set_name',this.state.data_set_name);
        formData.append('username',this.state.username);
        formData.append('className','class1name');
        formData.append('output',this.state.output);
        formData.append('secondclassName','class0name');
        formData.append('timestamp','Years');
        formData.append('comments','no comment');
        formData.append('rawData',this.state.rawData)
        formData.append('states',this.state.states);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                // 'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    handleVisualRequest = () => {
        this.sendVisualRequest()
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    window.alert('success!');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={10}>
                        <Button block={true} className={"btn-hugobot"} onClick={this.handleVisualRequest} type={"submit"}>
                            Visualize TIM
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Visualization;