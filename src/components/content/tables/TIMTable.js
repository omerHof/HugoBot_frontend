import React, { Component } from "react";
import Table from "react-bootstrap/Table";
class TIMTable extends Component {

    renderTableData=()=> {
        return this.props.TIM.rows.map((iter) => {
            return (
                <tr key={iter.PAAWindowSize.concat(iter.MethodOfDiscretization,iter.BinsNumber,iter.InterpolationGap)}
                >
                    <td>{iter.MethodOfDiscretization}</td>
                    <td>{iter.BinsNumber}</td>
                    <td>{iter.InterpolationGap}</td>
                    <td>{iter.PAAWindowSize}</td>
                    <td>{iter.epsilon}</td>
                    <td>{iter.MaxGap}</td>
                    <td>{iter.VerticalSupport}</td>
                    <td>{<button className="DownLoadBTN" onClick={this.toDelete}>Download</button>}</td>
                </tr>
            )
        })
    };

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

export default TIMTable ;