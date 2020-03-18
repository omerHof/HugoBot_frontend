import React, {Component} from "react";

import {Form, Table} from "react-bootstrap";
import history from '../../../History'

class HomeTable extends Component {

    state={
        filterDatasetName: "",
        filterCategory: null,
        filterSize: null,
        filterOwner: null,
        filterPublicPrivate: null
    }

    componentDidMount() {
        if (sessionStorage.getItem("user").localeCompare("true")!=0) {
            history.push('/Login');
        }
        sessionStorage.setItem("dataSet","false");
        window.dispatchEvent(new Event("ReloadTable1"));
        window.dispatchEvent(new Event("ReloadDataSet"));
    }


    filter = (UserID, DatasetName, Category, Size, Owner, PublicPrivate) => {
        this.state.filterCategory = document.getElementById("category").value;
        this.state.filterDatasetName = document.getElementById("datasetName").value;
        this.state.filterSize = document.getElementById("size").value;
        this.state.filterOwner = document.getElementById("owner").value;
        this.state.filterPublicPrivate = document.getElementById("publicPrivate").value;
        this.forceUpdate();
    };

    // onClick={(e) =>  {this.props.CollectData( iter.DatasetName); }}

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
        return this.props.HomeTable.rows.map((iter) => {
            console.log(this.state.filterDatasetName==null||this.state.filterDatasetName.localeCompare(iter.DatasetName)===0);
            if((this.state.filterSize==null||parseFloat(this.state.filterSize)>parseFloat(iter.Size))
                &&(this.state.filterDatasetName==null||(this.state.filterDatasetName.localeCompare(iter.DatasetName)===0))
                &&(this.state.filterCategory==null||this.state.filterCategory.localeCompare(iter.Category)===0)
                &&(this.state.filterOwner==null||this.state.filterOwner.localeCompare(iter.Owner)===0)
                &&(this.state.filterPublicPrivate==null||this.state.filterPublicPrivate.localeCompare(iter.PublicPrivate)===0))
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


    //CollectData=(e,id) =>{
    // window.location.href='/Tutorial'
    // this.props.collectDate.bind(this, id);

    // }

    render() {
        return (
            <Table striped={true} bordered={true} hover={true}>
                {this.renderTableHeader()}
                <tbody>
                {this.renderTableData()}
                </tbody>
            </Table>
        )
    }
}

export default HomeTable;
