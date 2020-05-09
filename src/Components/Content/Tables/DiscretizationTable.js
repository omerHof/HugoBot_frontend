import React, { Component } from "react";

import {Button, Card, Table} from "react-bootstrap";
import Axios from "axios";
import cookies from "js-cookie";

class DiscretizationTable extends Component {

    constructor(props){
        super(props);

        this.currConfigHeadElement = this.currConfigHeadElement.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleDownloadRequest = this.handleDownloadRequest.bind(this);
        this.sendDownloadRequest = this.sendDownloadRequest.bind(this);
    };

    handleDownloadRequest(e){

        let idx = parseInt(e.target.id.charAt(e.target.id.length - 1));
        window.alert(idx);
        let disc = JSON.parse(sessionStorage.getItem("DiscretizationTable"));
        window.alert(disc);
        let id = disc.rows[idx]['id'];

        this.sendDownloadRequest(id)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    window.alert('success!');
                    let blob = new Blob([response.data], {type: 'text/csv'});

                    let a = document.createElement("a");
                    a.style = "display: none";
                    document.body.appendChild(a);

                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'states.csv';

                    a.click();

                    window.URL.revokeObjectURL(url);
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
    };

    sendDownloadRequest(id){
        const url = 'http://localhost:80/getDISC';
        const formData = new FormData();
        formData.append('disc_id',id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    currConfigHeadElement(){
        return(
            <Card.Header className={"bg-hugobot"}>
                <Card.Text className={"text-hugobot"}>
                    Use an Existing Configuration
                </Card.Text>
            </Card.Header>
        );
    };

    renderTableHeader = () => {
        return (
            <tr>
                <td>
                    PAA Window Size
                </td>
                <td>
                    Method Of Discretization
                </td>
                <td>
                    Bins Number
                </td>
                <td>
                    Interpolation Gap
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderTableData=()=> {
        return JSON.parse(sessionStorage.DiscretizationTable).rows.map((iter, idx) => {
            return (
                <tr key={idx.toString()}>
                    <td id={"tdPAA"+idx}>
                        {iter.PAAWindowSize}
                    </td>
                    <td id={"tdAbMethod"+idx}>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td id={"tdNumStates"+idx}>
                        {iter.BinsNumber}
                    </td>
                    <td id={"tdInterpolationGap"+idx}>
                        {iter.InterpolationGap}
                    </td>
                    <td>
                        {<Button className="bg-hugobot" id={"download"+idx} onClick={this.handleDownloadRequest}>
                            <i className="fas fa-download"/> Download
                        </Button>}
                    </td>
                </tr>
            );
        });
    };

    render() {
        let that = this;
        window.addEventListener("ReloadTable", function(){that.forceUpdate()});
        return (
            <Card style={{ width: 'auto' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Use an Existing Configuration
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Table striped={true} bordered={true} hover={true}>
                        <tbody>
                            {this.renderTableHeader()}
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    };
}

export default DiscretizationTable ;