import React, { Component } from "react";

import {Button, Container, Form, Nav, Table} from "react-bootstrap";

import History from "../../../History";
import HomeData from "../Tables/mainTable";

class Manage extends Component{

    constructor(props) {
        super(props);
        this.state = {  HomeTable: HomeData,
                        pageLoc: "myDatasets",
                        filterDatasetName: "",
                        filterCategory: "",
                        filterSize: "",
                        filterOwner: "",
                        filterPublicPrivate: ""
        }

        this.askPermissionHandler = this.askPermissionHandler.bind(this);
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

    clicked = (id) => {
        this.setState({pageLoc: id})
        this.forceUpdate();
    };

    tabFilter = (tab, row) => {
        return(
            (this.state.pageLoc.localeCompare("myDatasets") === 0
                && row["Owner"].localeCompare("raz shtrauchler") === 0)
            ||
            (this.state.pageLoc.localeCompare("sharedDatasets") === 0
                && row["Owner"].localeCompare("raz shtrauchler") !== 0
                && row["SharedWithMe"].localeCompare("Yes") === 0)
            ||
            (this.state.pageLoc.localeCompare("pendingDatasets") === 0
                && row["PendingApproval"].localeCompare("Yes") === 0)
            ||
            (this.state.pageLoc.localeCompare("searchDatasets") === 0
                && row["PendingApproval"].localeCompare("No") === 0
                && row["SharedWithMe"].localeCompare("No") === 0)
        );
    };

    askPermissionHandler(e){
        //TODO find a more scalable way to do this (that does not involve copying the entire matrix)
        let HomeData = this.state.HomeTable;
        let index = e.target.id.slice(-1);
        HomeData.rows[index]["PendingApproval"] = "Yes";
        this.setState({HomeTable:HomeData});
        this.forceUpdate();
    }

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
                    <td align={"center"}>
                        Filters
                    </td>
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
                <td>{row["UserID"]}</td>
                <td>{row["DatasetName"]}</td>
                <td>{row["Category"]}</td>
                <td>{row["Size"]}</td>
                <td>{row["Owner"]}</td>
                <td>{row["PublicPrivate"]}</td>
                <td hidden={this.state.pageLoc.localeCompare("searchDatasets") !== 0}>
                    <Button
                        className={"btn-hugobot"}
                        id={"askPermission"+index}
                        onClick={this.askPermissionHandler}>

                        Access
                    </Button>
                </td>
            </tr>
        );
    };

    renderTableData = () => {
        return this.state.HomeTable.rows.map((iter, index) => {
            if((this.state.filterSize.localeCompare("") === 0 || parseFloat(this.state.filterSize)>parseFloat(iter["Size"]))
                &&(this.state.filterDatasetName.localeCompare("") === 0 || iter["DatasetName"].includes(this.state.filterDatasetName))
                &&(this.state.filterCategory.localeCompare("") === 0 || iter["Category"].includes(this.state.filterCategory))
                &&(this.state.filterOwner.localeCompare("") === 0 || iter["Owner"].includes(this.state.filterOwner))
                &&(this.state.filterPublicPrivate.localeCompare("") === 0 || iter["PublicPrivate"].includes(this.state.filterPublicPrivate))
                &&(this.tabFilter(this.state.pageLoc, iter)))
            {
                return this.renderTableRow(iter, index);
            }
            else{
                return null;
            }
        })
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
                            active={this.state.pageLoc.localeCompare("sharedDatasets") === 0}
                            id={"sharedDatasets"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"sharedDatasets")}>

                            Shared with me
                        </Button>
                        <Button
                            active={this.state.pageLoc.localeCompare("pendingDatasets") === 0}
                            id={"pendingDatasets"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"pendingDatasets")}>

                            Pending Approval
                        </Button>
                        <Button
                            active={this.state.pageLoc.localeCompare("searchDatasets") === 0}
                            id={"searchDatasets"}
                            className={"nav-link btn-hugobot"}
                            onClick={this.clicked.bind(null,"searchDatasets")}>

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
                {/*here we need to render the table according to the button pressed*/}
            </Container>
        );
    }
}
export default Manage;