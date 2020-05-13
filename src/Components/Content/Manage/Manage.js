import React, { Component } from "react";

import {Button, Container, Form, Nav, Table} from "react-bootstrap";

import History from "../../../History";
// import HomeData from "../Tables/mainTable";
import cookies from "js-cookie";
import Axios from "axios";

class Manage extends Component{

    constructor(props) {
        super(props);
        this.state = {  pageLoc: "myDatasets",
                        filterDatasetName: "",
                        filterCategory: "",
                        filterSize: "",
                        filterOwner: "",
                        filterPublicPrivate: ""
        }

        this.askPermissionHandler = this.askPermissionHandler.bind(this);
        this.acceptPermissionHandler = this.acceptPermissionHandler.bind(this);
        this.loadMail();
    }

    filter = () => {
        this.setState({
            filterCategory: document.getElementById("category").value,
            filterDatasetName: document.getElementById("datasetName").value,
            filterSize: document.getElementById("size").value,
            filterOwner: document.getElementById("owner").value,
            filterPublicPrivate: document.getElementById("publicPrivate").value,
        });
        this.forceUpdate();
    };

    //<editor-fold desc="Mail Module Logic">
    //<editor-fold desc="Ask Permission">
    askPermissionHandler(e){
        //get td id and extract inner html
        let id = e.target.id.split('-')[1];
        let datasetName = document.getElementById("managePermissionDatasetName-"+id).innerHTML;
        console.log(datasetName)

        this.askPermissionsRequest(datasetName)
            .then((response)=>{
                if(response.status < 400){
                    console.log('success!');
                    console.log(response.data['message']);
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
        this.forceUpdate();
    }

    askPermissionsRequest(datasetName){
        const url = 'http://localhost:80/askPermission?dataset='+datasetName;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
    }
    //</editor-fold>

    //<editor-fold desc="Accept Permission">
    acceptPermissionHandler(e){
        //get td id and extract inner html
        let id = e.target.id.split('-')[1];
        let datasetName = document.getElementById("managePermissionDatasetName-"+id).innerHTML;
        let email = "";
        console.log("email before:" + email);
        console.log(datasetName);

        this.getEmail()
            .then((response)=>{
                if(response.status < 400){
                    email = response.data['Email'];
                    console.log("email after:" + email);

                    this.acceptPermissionsRequest(datasetName,email)
                        .then((response)=>{
                            if(response.status < 400){
                                console.log('success!');
                                console.log(response.data['message']);
                            }
                            else{
                                window.alert('uh oh, there\'s a problem!')
                            }
                        });
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });

        this.forceUpdate();
    }

    acceptPermissionsRequest(datasetName,email){
        const url = 'http://localhost:80/acceptPermission?dataset='+datasetName+"&userEmail="+email;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
    }

    getEmail(){
        const url = 'http://localhost:80/getEmail';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
    }
    //</editor-fold>

    //<editor-fold desc="Load Mail">
    loadMail(){
        this.loadMailRequest()
            .then((response)=>{
                if(response.status < 400){

                    let resMyDatasets= response.data["myDatasets"];
                    let i;
                    let myDatasets = {"rows": []}
                    for (i = 0; i < response.data["myDatasetsLen"]; i++) {
                        let y=resMyDatasets[parseInt(i)];
                        myDatasets.rows.push(y)
                    }

                    sessionStorage.setItem('myDatasets',JSON.stringify(myDatasets));

                    let resMyPermissions= response.data["myPermissions"];
                    let myPermissions = {"rows": []}
                    for (i = 0; i < response.data["myPermissionsLen"]; i++) {
                        let y=resMyPermissions[parseInt(i)];
                        myPermissions.rows.push(y)
                    }

                    sessionStorage.setItem('myPermissions',JSON.stringify(myPermissions));


                    let resAskPermissions= response.data["askPermissions"];
                    let askPermissions = {"rows": []}
                    for (i = 0; i < response.data["askPermissionsLen"]; i++) {
                        let y=resAskPermissions[parseInt(i)];
                        askPermissions.rows.push(y)
                    }

                    sessionStorage.setItem('askPermissions',JSON.stringify(askPermissions));
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
    };

    loadMailRequest = () => {
        const url = 'http://localhost:80/loadMail';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url,config);
    };
    //</editor-fold>
    //</editor-fold>

    //<editor-fold desc="Tab Switch Logic">
    clicked = (id) => {
        this.setState({pageLoc: id})
        this.forceUpdate();
    };

    isInTab = (tab,datasetName) => {
        let flag = false;
        JSON.parse(sessionStorage.getItem(tab)).rows.find((iter) =>
            flag |= datasetName.localeCompare(iter['DatasetName']) === 0);
        return flag;
    }

    isInExploreTab = (datasetName) => {
        console.log(datasetName);
        console.log("in my datasets: " + this.isInTab('myDatasets',datasetName));
        console.log("in my Permissions: " + this.isInTab('myPermissions',datasetName));
        console.log("in ask Permissions: " + this.isInTab('askPermissions',datasetName));
        return !(this.isInTab('myDatasets',datasetName) ||
            this.isInTab('myPermissions',datasetName) ||
            this.isInTab('askPermissions',datasetName))
    };
    //</editor-fold>

    componentDidMount() {
        if (sessionStorage.getItem("user").localeCompare("true")!==0) {
            History.push('/Login');
        }
        sessionStorage.setItem("dataSet","false");
        window.dispatchEvent(new Event("ReloadTable1"));
        window.dispatchEvent(new Event("ReloadDataSet"));
    }

    renderTableHeader = () => {
        return(
            <thead>
                <tr>
                    <td>
                        <Form.Control id={"datasetName"} onChange={this.filter} placeholder={"Dataset Name"} type={"text"}/>
                    </td>
                    <td>
                        <Form.Control id={"category"} onChange={this.filter} placeholder={"Category"} type={"text"}/>
                    </td>
                    <td>
                        <Form.Control id={"size"} onChange={this.filter} placeholder={"Size"} type={"text"}/>
                    </td>
                    <td>
                        <Form.Control id={"owner"} onChange={this.filter} placeholder={"Owner"} type={"text"}/>
                    </td>
                    <td>
                        <Form.Control id={"publicPrivate"} onChange={this.filter} placeholder={"Public/Private"} type={"text"}/>
                    </td>
                    <td hidden={this.state.pageLoc.localeCompare("searchDatasets") !== 0}>
                        Request Access
                    </td>
                </tr>
            </thead>
        );
    };

    renderTableRow = (row, index) => {
        return(
            <tr key={index.toString()}>
                <td id={'managePermissionDatasetName-'+index}>
                    {row["DatasetName"]}
                </td>
                <td>{row["Category"]}</td>
                <td>{row["Size"]}</td>
                <td>{row["Owner"]}</td>
                <td>{row["PublicPrivate"]}</td>
                <td hidden={this.state.pageLoc.localeCompare("allTables") !== 0}>
                    <Button
                        className={"btn-hugobot"}
                        id={"askPermission-"+index}
                        onClick={this.askPermissionHandler}>

                        Access
                    </Button>
                </td>
                <td hidden={this.state.pageLoc.localeCompare("askPermissions") !== 0}>
                    <Button
                        className={"btn-hugobot"}
                        id={"acceptPermission-"+index}
                        onClick={this.acceptPermissionHandler}>

                        Grant Access
                    </Button>
                </td>
            </tr>
        );
    };

    renderTableData = () => {
        return JSON.parse(sessionStorage.getItem(this.state.pageLoc)).rows.map((iter, index) => {
            if(this.state.pageLoc.localeCompare("allTables") !== 0 || this.isInExploreTab(iter['DatasetName'])){
                if((this.state.filterSize.localeCompare("") === 0 || parseFloat(this.state.filterSize)>parseFloat(iter["Size"]))
                    &&(this.state.filterDatasetName.localeCompare("") === 0 || iter["DatasetName"].includes(this.state.filterDatasetName))
                    &&(this.state.filterCategory.localeCompare("") === 0 || iter["Category"].includes(this.state.filterCategory))
                    &&(this.state.filterOwner.localeCompare("") === 0 || iter["Owner"].includes(this.state.filterOwner))
                    &&(this.state.filterPublicPrivate.localeCompare("") === 0 || iter["PublicPrivate"].includes(this.state.filterPublicPrivate)))
                {
                    return this.renderTableRow(iter, index);
                }
                else{
                    return null;
                }
            }
            else{
                return null;
            }
        });
    };

    render() {
        return (
            <Container fluid={true}>
                <br/>
                <br/>
                <Nav variant={"tabs"}>
                    {/*<Router history={History}>*/}
                        <Button
                            active={this.state.pageLoc.localeCompare("myDatasets") === 0}
                            id={"myDatasets"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"myDatasets")}>

                            My Datasets
                        </Button>
                        <Button
                            active={this.state.pageLoc.localeCompare("myPermissions") === 0}
                            id={"myPermissions"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"myPermissions")}>

                            Shared with me
                        </Button>
                        <Button
                            active={this.state.pageLoc.localeCompare("askPermissions") === 0}
                            id={"askPermissions"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"askPermissions")}>

                            Pending Approval
                        </Button>
                        <Button
                            active={this.state.pageLoc.localeCompare("allTables") === 0}
                            id={"allTables"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"allTables")}>

                            Explore...
                        </Button>
                    {/*</Router>*/}
                </Nav>
                <br/>
                <Table striped={true} bordered={true} hover={true}>
                    {this.renderTableHeader()}
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
export default Manage;