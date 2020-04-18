import React, {Component} from "react";

import {Button, Card, Form, Table} from "react-bootstrap";

import history from '../../../History'

class HomeTable extends Component {
    
     state={
        filterDatasetName: "",
        filterCategory: "",
        filterSize: "",
        filterOwner: "",
        filterPublicPrivate: ""
    };


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

    componentDidMount() {
        if (sessionStorage.getItem("user").localeCompare("true") !== 0) {
            history.push('/Login');
        }
        sessionStorage.setItem("dataSet","false");
        window.dispatchEvent(new Event("ReloadTable1"));
        window.dispatchEvent(new Event("ReloadDataSet"));
    }

    // onClick={(e) =>  {this.props.CollectData( iter.DatasetName); }}

    renderTableHeader = () => {
        return(
            <thead>
                <tr>
                    <th align={"center"}>
                        Filters
                    </th>
                    <th>
                        <Form.Control id={"datasetName"} onChange={this.filter} placeholder={"Dataset Name"} type={"text"}/>
                    </th>
                    <th>
                        <Form.Control id={"category"} onChange={this.filter} placeholder={"Category"} type={"text"}/>
                    </th>
                    <th>
                        <Form.Control id={"size"} onChange={this.filter} placeholder={"Size"} type={"text"}/>
                    </th>
                    <th>
                        <Form.Control id={"owner"} onChange={this.filter} placeholder={"Owner"} type={"text"}/>
                    </th>
                    <th>
                        <Form.Control id={"publicPrivate"} onChange={this.filter} placeholder={"Public/Private"} type={"text"}/>
                    </th>
                </tr>
            </thead>
        );
    };

    renderTableData = () => {
        return this.props.HomeTable.rows.map((iter) => {
            // console.log(this.state.filterDatasetName==null||this.state.filterDatasetName.localeCompare(iter.DatasetName)===0);
            if((this.state.filterSize.localeCompare("") === 0 || parseFloat(this.state.filterSize)>parseFloat(iter["Size"]))
                &&(this.state.filterDatasetName.localeCompare("") === 0 || iter["DatasetName"].includes(this.state.filterDatasetName))
                &&(this.state.filterCategory.localeCompare("") === 0 || iter["Category"].includes(this.state.filterCategory))
                &&(this.state.filterOwner.localeCompare("") === 0 || iter["Owner"].includes(this.state.filterOwner))
                &&(this.state.filterPublicPrivate.localeCompare("") === 0 || iter["PublicPrivate"].includes(this.state.filterPublicPrivate)))
                {
                return (
                    <tr onClick={() => {
                        this.props.CollectData(iter["DatasetName"]);
                    }}
                    >
                        <td>{iter["UserID"]}</td>
                        <td>{iter["DatasetName"]}</td>
                        <td>{iter["Category"]}</td>
                        <td>{iter["Size"]}</td>
                        <td>{iter["Owner"]}</td>
                        <td>{iter["PublicPrivate"]}</td>
                    </tr>
                )
            }
            else{
                return null;
            }
        })
    };

    onClick = () => {
      history.push("/Upload/Metadata");
    };

    //CollectData=(e,id) =>{
    // window.location.href='/Tutorial'
    // this.props.collectDate.bind(this, id);

    // }

    render() {
        return (
            <Card>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Add a New Configuration
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Datasets
                    </Card.Text>
                    <Button className={"btn-hugobot"} href={"/Upload/Metadata"} onClick={this.onClick} size={"sm"}>
                        <i className="fas fa-upload"/>&nbsp;
                        Upload Dataset
                    </Button>
                    <br/>
                    <br/>
                    <Table striped={true} bordered={true} hover={true}>
                        {this.renderTableHeader()}
                        <tbody>
                        {this.renderTableData()}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}

export default HomeTable;
