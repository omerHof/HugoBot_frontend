import React, { Component } from "react";
// import Chart from "react-google-charts";
import { Button, Table, Card } from "react-bootstrap";
import InputNumber from 'react-input-number';


class SearchLimits extends Component {
    state = {
        minHS: 0,
        maxHS: 0,
        minVS: 0,
        maxVS: 0,
        minSize: 0,
        maxsize: 0
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="limits">

                <Table>
                    <tr >
                        <td>
                        </td>
                        <td >
                            Limit M.H.S
                        </td>
                        <td >
                            Limit V.S
                        </td>
                        <td >
                            Limit TIRP Size
                        </td>
                    </tr>
                    <tr>
                        <td>
                            min
                        </td>
                        <td >
                            <input type="number" value={this.state.minHS} ></input>
                        </td>
                        <td >
                            
                                 <input type="number" value={this.state.minVS}></input>%
                           
                             
                        </td>
                        <td >
                             <input type="number" value={this.state.minSize}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            max

                        </td>
                        <td >
                            <input type="number" value={this.state.maxHS}></input>
                        </td>
                        <td >
                          
                                 <input type="number" value={this.state.maxVS}></input>%
                            
                             
                        </td>
                        <td >
                             <input type="number" value={this.state.maxsize}></input>
                        </td>
                    </tr>
                </Table>
<center>
                    <Button onClick={this.props.onClick}>
                        Search
                   </Button>
</center>
            </div>
        );
    }
}

export default SearchLimits;