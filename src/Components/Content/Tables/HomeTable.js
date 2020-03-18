import React, {Component} from "react";

import {Form, Table} from "react-bootstrap";

import UserContext from '../../../contexts/userContext'
import history from '../../../History'

class HomeTable extends Component {
    
     state={
        filterUserID: null,
        filterDatasetName: null,
        filterCategory: null,
        filterSize: null,
        filterOwner: null,
        filterPublicPrivate: null
    }


   filter = (UserID, DatasetName, Category, Size, Owner, PublicPrivate) => {
        this.state.filterCategory=Category;
        this.state.filterDatasetName= DatasetName;
        this.state.filterUserID= UserID;
        this.state.filterSize= Size;
        this.state.filterOwner= Owner;
        this.state.filterPublicPrivate=PublicPrivate;
        this.forceUpdate();
    };

    componentDidMount() {
        if (!this.context.user) {
            history.push('/Login');
        }
    }

    // onClick={(e) =>  {this.props.CollectData( iter.DatasetName); }}

    renderTableHeader = () => {
        return(
            <thead>
                <td align={"center"}>
                    Filters
                </td>
                <td>
                    <Form.Control onChange={this.reRender} placeholder={"Dataset Name"} type={"text"}/>
                </td>
                <td>
                    <Form.Control onChange={this.reRender} placeholder={"Category"} type={"text"}/>
                </td>
                <td>
                    <Form.Control onChange={this.reRender} placeholder={"Size"} type={"text"}/>
                </td>
                <td>
                    <Form.Control onChange={this.reRender} placeholder={"Owner"} type={"text"}/>
                </td>
                <td>
                    <Form.Control onChange={this.reRender} placeholder={"Public/Private"} type={"text"}/>
                </td>
            </thead>
        );
    };
renderTableData = () => {
        return this.props.HomeTable.rows.map((iter) => {
            console.log(this.state.filterDatasetName==null||this.state.filterDatasetName.localeCompare(iter.DatasetName)==0);
            if((this.state.filterSize==null||parseFloat(this.state.filterSize)>parseFloat(iter.Size))
                &&(this.state.filterDatasetName==null||(this.state.filterDatasetName.localeCompare(iter.DatasetName)==0))
                &&(this.state.filterUserID==null||this.state.filterUserID.localeCompare(iter.UserID)==0)
                &&(this.state.filterCategory==null||this.state.filterCategory.localeCompare(iter.Category)==0)
                &&(this.state.filterOwner==null||this.state.filterOwner.localeCompare(iter.Owner)==0)
                &&(this.state.filterPublicPrivate==null||this.state.filterPublicPrivate.localeCompare(iter.PublicPrivate)==0))
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

HomeTable.contextType = UserContext;

export default HomeTable;
