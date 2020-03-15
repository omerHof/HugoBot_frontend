import React, {Component} from "react";

import {Table} from "react-bootstrap";

import UserContext from '../../../contexts/userContext'
import history from '../../../History'

class HomeTable extends Component {

    componentDidMount() {
        if (!this.context.user) {
            history.push('/Login');
        }
    }

    // onClick={(e) =>  {this.props.CollectData( iter.DatasetName); }}

    renderTableData = () => {
        return this.props.HomeTable.rows.map((iter) => {
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
        })
    };


    //CollectData=(e,id) =>{
    // window.location.href='/Tutorial'
    // this.props.collectDate.bind(this, id);

    // }

    render() {
        return (
            <Table striped={true} bordered={true} hover={true}>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </Table>
        )
    }
}

HomeTable.contextType = UserContext;

export default HomeTable;