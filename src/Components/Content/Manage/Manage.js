import React, { Component } from "react";

import {Button, Container, Form, Nav, Table} from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";

import History from "../../../History";

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
                    this.loadMail();
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
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
        let email = document.getElementById("managePermissionGrantee-"+id).innerHTML;
        console.log(datasetName);
        console.log(email);

        this.acceptPermissionsRequest(datasetName,email)
            .then((response)=>{
                if(response.status < 400){
                    console.log('success!');
                    console.log(response.data['message']);
                    window.dispatchEvent(new Event("ReloadMail"));
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            });
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

                    // let fullName = response.data['User_full_name']
                    let resAskPermissions= response.data["askPermissions"];
                    let askPermissions = {"rows": []}
                    for (i = 0; i < response.data["askPermissionsLen"]; i++) {
                        let y=resAskPermissions[parseInt(i)];
                        //if he is the owner, then it's a request that he needs to approve.
                        //else, it's a request that he asked for and no further action is available
                        // if(y['Owner'].localeCompare(fullName) === 0)
                        //     approve.rows.push(y);
                        // else
                        askPermissions.rows.push(y)
                    }

                    sessionStorage.setItem('askPermissions',JSON.stringify(askPermissions));
                    console.log(response.data["approve"])
                    let resApprove= response.data["approve"];
                    let approve = {"rows": []}
                    for (i = 0; i < response.data["approveLen"]; i++) {
                        console.log(resApprove[parseInt(i)])
                        let y=resApprove[parseInt(i)];
                        approve.rows.push(y)
                    }
                    sessionStorage.setItem('approve',JSON.stringify(approve));
                    window.dispatchEvent(new Event("ReloadMail"));
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
        return !(this.isInTab('myDatasets',datasetName) ||
            this.isInTab('myPermissions',datasetName) ||
            this.isInTab('askPermissions',datasetName) ||
            this.isInTab('approve',datasetName));
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
                    <td hidden={this.state.pageLoc.localeCompare("allTables") !== 0}>
                        Request Access
                    </td>
                    <td hidden={this.state.pageLoc.localeCompare("approve") !== 0}>
                        Grantee
                    </td>
                    <td hidden={this.state.pageLoc.localeCompare("approve") !== 0}>
                        Grant Access
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
                <td hidden={this.state.pageLoc.localeCompare("approve") !== 0} id={'managePermissionGrantee-'+index}>
                    {row["Grantee"]}
                </td>
                <td hidden={this.state.pageLoc.localeCompare("approve") !== 0}>
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
        let canLaunch = "approve" in sessionStorage &&
            "askPermissions" in sessionStorage &&
            "askPermissions" in sessionStorage &&
            "askPermissions" in sessionStorage

        if(canLaunch){
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
        }
    };

    render() {
        let that = this;
        window.addEventListener("ReloadMail", function(){that.forceUpdate()});
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
                            active={this.state.pageLoc.localeCompare("approve") === 0}
                            id={"approve"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"approve")}>

                            Approve
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