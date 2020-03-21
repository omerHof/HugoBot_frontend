import React, { Component } from "react";
import {Link, Router} from "react-router-dom";

import {Container, Form, Nav, Table} from "react-bootstrap";

import History from "../../../History";
import HomeData from "../Tables/mainTable";

class Manage extends Component{

    // state = {
    //     pageLoc: 1,
    //     filterDatasetName: "",
    //     filterCategory: "",
    //     filterSize: "",
    //     filterOwner: "",
    //     filterPublicPrivate: ""
    // };

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {  HomeTable: HomeData,
                        pageLoc: 1,
                        filterDatasetName: "",
                        filterCategory: "",
                        filterSize: "",
                        filterOwner: "",
                        filterPublicPrivate: ""
        }
    }

    filter = (UserID, DatasetName, Category, Size, Owner, PublicPrivate) => {
        this.state.filterCategory = document.getElementById("category").value;
        this.state.filterDatasetName = document.getElementById("datasetName").value;
        this.state.filterSize = document.getElementById("size").value;
        this.state.filterOwner = document.getElementById("owner").value;
        this.state.filterPublicPrivate = document.getElementById("publicPrivate").value;
        this.forceUpdate();
    };

    bloop = () => {
        window.alert("bloopi bloop");
    };

    componentDidMount() {
        if (sessionStorage.getItem("user").localeCompare("true")!=0) {
            History.push('/Login');
        }
        sessionStorage.setItem("dataSet","false");
        window.dispatchEvent(new Event("ReloadTable1"));
        window.dispatchEvent(new Event("ReloadDataSet"));
    }

    renderTableHeader = () => {
        return(
            <thead>
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
            </thead>
        );
    };

    renderTableData = () => {
        return this.state.HomeTable.rows.map((iter) => {
            // window.alert("start");
            // window.alert(this.state.filterSize);
            // window.alert("end");
            // console.log(this.state.filterDatasetName==null||this.state.filterDatasetName.localeCompare(iter.DatasetName)===0);
            if((this.state.filterSize.localeCompare("") === 0 || parseFloat(this.state.filterSize)>parseFloat(iter.Size))
                &&(this.state.filterDatasetName.localeCompare("") === 0 || iter.DatasetName.includes(this.state.filterDatasetName))
                &&(this.state.filterCategory.localeCompare("") === 0 || iter.Category.includes(this.state.filterCategory))
                &&(this.state.filterOwner.localeCompare("") === 0 || iter.Owner.includes(this.state.filterOwner))
                &&(this.state.filterPublicPrivate.localeCompare("") === 0 || iter.PublicPrivate.includes(this.state.filterPublicPrivate)))
            {
                return (
                    <tr onClick={(e) => {
                        this.props.CollectData(iter.DatasetName);
                    }}
                    >
                        <td>{iter.UserID}</td>
                        <td>{iter.DatasetName}</td>
                        <td>{iter.Category}</td>
                        <td>{iter.Size}</td>
                        <td>{iter.Owner}</td>
                        <td>{iter.PublicPrivate}</td>
                    </tr>
                )
            }
        })
    };

    render() {
        return (
            <Container fluid={true}>
                <br/>
                <br/>
                <Nav variant={"tabs"}>
                    <Router history={History}>
                        <Link to={"/Manage"} className={"nav-link btn-hugobot"}>
                            My Datasets
                        </Link>
                        <Link to={"/Manage"} className={"nav-link btn-hugobot"}>
                            Shared with me
                        </Link>
                        <Link to={"/Manage"} className={"nav-link btn-hugobot"}>
                            Pending Approval
                        </Link>
                    </Router>
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