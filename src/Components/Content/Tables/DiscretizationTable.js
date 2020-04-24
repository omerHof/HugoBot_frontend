import React, { Component } from "react";

import {Button, Card, Table} from "react-bootstrap";
import Axios from "axios";

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

        let idx = e.target.id.slice(-1);
        window.alert(e.target.id);
        window.alert(idx);
        let PAA = document.getElementById("tdPAA"+idx).innerHTML;
        let AbMethod = document.getElementById("tdAbMethod"+idx).innerHTML;
        let NumStates = document.getElementById("tdNumStates"+idx).innerHTML;
        let InterpolationGap = document.getElementById("tdInterpolationGap"+idx).innerHTML;

        this.sendDownloadRequest(PAA,AbMethod,NumStates,InterpolationGap)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    window.alert('success!');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
    };

    sendDownloadRequest(PAA,AbMethod,NumStates,InterpolationGap){
        const url = 'http://localhost:5000/getExistingDisc';
        const formData = new FormData();
        formData.append('PAA',PAA);
        formData.append('AbMethod',AbMethod);
        formData.append('NumStates',NumStates);
        formData.append('InterpolationGap',InterpolationGap);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
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