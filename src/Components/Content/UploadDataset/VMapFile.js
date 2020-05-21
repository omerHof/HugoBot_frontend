import React, { Component } from "react";

import {Button, ButtonGroup, Card, Form, Table} from "react-bootstrap";

import history from "../../../History";

import Axios from "axios";
import cookies from "js-cookie";

class VMapFile extends Component{

    constructor(props) {
        super(props);
        this.state ={
            map: new Map(),
            onDisplay: "None",
            VMapList: [],
            uploadFile:null
        }

        this.getVariablesForVMap();

        this.changeViewCreate = this.changeViewCreate.bind(this);
        this.changeViewUpload = this.changeViewUpload.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onUploadSubmit = this.onUploadSubmit.bind(this);
        this.sendVMapUpload = this.sendVMapUpload.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.sendVMapCreate = this.sendVMapCreate.bind(this);
        this.recolorCell = this.recolorCell.bind(this);


    }

    UNFILLED_COLOR = 'FF8080';
    DUPLICATE_COLOR = 'FFEB99';
    OK_COLOR = '77db60';

    recolorCell(e){
        let element = document.getElementById(e.target.id+"_td");
        let flag = false;
        let map = this.state.map;

        if(e.target.value === ""){
            element.setAttribute('bgcolor',this.UNFILLED_COLOR);
            map.delete(e.target.id+"_td");
        }
        else{
            for(let key of this.state.map.keys()){
                // window.alert(key + " : " + this.state.map.get(key));
                if(map.get(key).localeCompare(e.target.value) === 0){
                    flag = true;
                    document.getElementById(key).setAttribute('bgcolor',this.DUPLICATE_COLOR);
                }
            }
            if(flag){
                element.setAttribute('bgcolor',this.DUPLICATE_COLOR);
            }
            else{
                element.setAttribute('bgcolor',this.OK_COLOR);
            }
        }
        map.set(e.target.id+"_td",e.target.value);
    };

    changeViewCreate(){
        this.setState({onDisplay:"Create"});
    }

    changeViewUpload(){
        this.setState({onDisplay:"Upload"});
    }

    //<editor-fold desc="Create">
    renderTableHeader = () => {
        return(
            <thead>
                <tr>
                    <td>
                        Variable ID
                    </td>
                    <td>
                        Variable Name
                    </td>
                    <td>
                        Variable Description
                    </td>
                </tr>
            </thead>
        );
    };

    renderTableRow = (placeholder, idx) => {
        return (
            <tr key={idx.toString()}>
                <td>
                    <Form.Control id={"id"+idx} placeholder={placeholder}/>
                </td>
                <td bgcolor={this.UNFILLED_COLOR} id={"name"+idx+"_td"}>
                    <Form.Control bgcolor={this.UNFILLED_COLOR} id={"name"+idx} onChange={this.recolorCell}/>
                </td>
                <td>
                    <Form.Control id={"description"+idx}/>
                </td>
            </tr>
        );
    };

    renderTable = () => {
        return this.state.VMapList.map((iter,idx) =>
            this.renderTableRow(iter, idx)
        );
    };

    getVariablesForVMap = () => {
        let dataset_id = sessionStorage.getItem("datasetName");
        this.getVariablesForVMapRequest(dataset_id)
            .then((response) => {
                if(response.status < 400){
                    // console.log(response.data['VMapList']);
                    this.setState({VMapList: response.data['VMapList']})
                }
                else{
                    window.alert('uh oh, there\'s a problem!');
                }
            })
        .catch(error => {
            window.alert(error.response.data["message"]);
        });
    }

    getVariablesForVMapRequest = (dataset_id) => {
        const url = 'http://localhost:80/getVariableList?dataset_id='+dataset_id;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
    }

    onCreateSubmit(){
        let i = 0;
        let table = [];
        let id,name,desc = null;

        while (document.getElementById("id"+i) !== null){
            id = document.getElementById("id" + i).value;
            name = document.getElementById("name" + i).value;
            desc = document.getElementById("description" + i).value;
            table.push([id,name,desc]);
            i++;
        }

        let csv = table.map(function(d){
            return d.join();
        }).join('\n');
        let datasetName = sessionStorage.getItem('datasetName');

        this.sendVMapCreate(csv,datasetName)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    history.push('/Upload/Entities');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            })
            .catch(error => {
            window.alert(error.response.data["message"]);
            });
    }

    sendVMapCreate(csv,datasetName){
        const url = 'http://localhost:80/steptwocreate';
        const formData = new FormData();
        formData.append('csv',csv);
        formData.append('datasetName',datasetName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config)
    }
    //</editor-fold>

    //<editor-fold desc="Upload">
    renderUpload = () => {
        return(
            <Form onSubmit={this.onUploadSubmit}>
                Map File: &nbsp;&nbsp;
                <Form.Control accept={".csv"} type={"file"} onChange={this.onFileChange}/>
                <br/>
                <Button className={"btn-hugobot"} type={"submit"}>
                    <i className="fas fa-upload"/>&nbsp;
                    Upload
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button className={"btn btn-hugobot"}
                        onClick={() => (this.setState({file:null}))}
                        type={"reset"}>
                    Clear
                </Button>
                <br/>
            </Form>
        );
    };

    onFileChange(e){
        this.setState({uploadFile:e.target.files[0]})
    }

    onUploadSubmit(e){
        e.preventDefault();
        let datasetName = sessionStorage.getItem('datasetName');
        this.sendVMapUpload(this.state.uploadFile,datasetName)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    sessionStorage.setItem("uploadPageLoc","step_3");
                    window.dispatchEvent(new Event("ReIndicateActiveStep"));
                    history.push('/Upload/Entities');
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            })
        .catch(error => {
            window.alert(error.response.data["message"]);
        });
    }

    sendVMapUpload(file,datasetName){
        const url = 'http://localhost:80/steptwo';
        const formData = new FormData();
        formData.append('file',file);
        formData.append('datasetName',datasetName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config)
    };
    //</editor-fold>

    render() {
        return (
            <Card>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        VMap File
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <ButtonGroup>
                        <Button className="btn-hugobot" onClick={this.changeViewCreate} type={"button"}>
                            <i className="fas fa-edit"/>&nbsp;
                            Create new Variable Map
                        </Button>
                        <Button className="btn-hugobot" onClick={this.changeViewUpload} type={"button"}>
                            <i className="fas fa-upload"/>&nbsp;
                            Upload Variable Map
                        </Button>
                        {/*<Button className="btn-hugobot" type={"button"}>*/}
                        {/*    <i className="fas fa-check-square"/>&nbsp;*/}
                        {/*    Proceed to Step 3*/}
                        {/*</Button>*/}
                    </ButtonGroup>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.onDisplay.localeCompare("Upload") === 0 && this.renderUpload()}
                    <Table>
                        {this.state.onDisplay.localeCompare("Create") === 0 && this.renderTableHeader()}
                        <tbody>
                            {this.state.onDisplay.localeCompare("Create") === 0 && this.renderTable()}
                        </tbody>
                    </Table>
                    <br/>
                    <div hidden = {this.state.onDisplay.localeCompare("Create") !== 0}>
                        <Button className={"btn-hugobot"}
                                onClick={this.onCreateSubmit}>
                            Validate and Proceed to Step 3
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}
export default VMapFile;