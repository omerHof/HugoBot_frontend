import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, Table, Card, Row, Col } from "react-bootstrap";
import InputNumber from 'react-input-number';


class SearchLimits extends Component {
    state = {
        minVS: this.props.parameters.minVS
    }

    render() {
        // const minVS = this.props.parameters.minVS;
        return (
            <div className="limits">
                <Table className="limitsTable">
                    <thead>
                        <tr className="smallcol">
                            <th className="shirtcol">Limit</th>
                            <th>Mean Horizontal Support</th>
                            <th>Vertical Support</th>
                            <th>TIRP Size</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="shirtcol">min</td>
                            <td >
                                <input
                                    name="minHS" type="number" min="1"
                                    value={this.props.parameters.minHS}
                                    onChange={this.props.changeParameter}>
                                </input>
                            </td>
                            <td className="childrenOneLine" >
                                <input className="OneLine"
                                    name="minVS" type="number" min={this.state.minVS} max="100"
                                    value={this.props.parameters.minVS}
                                    onChange={this.props.changeParameter}>
                                </input >
                                <div className="OneLine">%</div>
                            </td>
                            <td >
                                <input
                                    name="minSize" type="number" min="1"
                                    value={this.props.parameters.minSize}
                                    onChange={this.props.changeParameter}>
                                </input>
                            </td>
                        </tr>

                        <tr>
                            <td className="shirtcol">max</td>
                            <td >
                                <input
                                    name="maxHS" type="number" min="1"
                                    value={this.props.parameters.maxHS}
                                    onChange={this.props.changeParameter}>
                                </input>
                            </td>
                            <td className="childrenOneLine">
                                <input className="OneLine"
                                    name="maxVS" type="number" min={this.state.minVS} max="100"
                                    value={this.props.parameters.maxVS}
                                    onChange={this.props.changeParameter}>
                                </input>
                                <div className="OneLine">%</div>
                            </td>
                            <td >
                                <input
                                    name="maxSize" type="number" min="1"
                                    value={this.props.parameters.maxSize}
                                    onChange={this.props.changeParameter}>
                                </input>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </Table>
                <div>
                    <center>
                        <Button onClick={this.props.onClick}> Search </Button>
                    </center>
                </div>
               
            </div>
        );
    }
}

export default SearchLimits;

