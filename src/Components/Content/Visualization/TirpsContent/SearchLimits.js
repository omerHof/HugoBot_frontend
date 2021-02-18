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
              <div>             
                    <Table className="limitsTable">
                        <tr >
                            <th></th>
                            <th >  Limit M.H.S      </th>
                            <th >  Limit V.S        </th>
                            <th >  Limit TIRP Size  </th>
                        </tr>
                        
                        <tr>
                            <td>min</td>
                            <td >
                                <input  
                                        name="minHS" type="number" min="1" 
                                        value={this.props.parameters.minHS} 
                                        onChange={this.props.changeParameter}>                                        
                                </input>
                            </td>
                            <td className = "childrenOneLine" >                                
                                 <input className = "OneLine" 
                                        name="minVS" type="number" min={this.state.minVS} max="100"
                                        value={this.props.parameters.minVS} 
                                        onChange={this.props.changeParameter}>                                        
                                </input >
                                <div className = "OneLine">%</div>                             
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
                            <td>max</td>
                            <td >
                                <input  
                                        name="maxHS" type="number" min="1"
                                        value={this.props.parameters.maxHS} 
                                        onChange={this.props.changeParameter}>                                        
                                </input>
                            </td>
                            <td className = "childrenOneLine">                                
                                 <input className = "OneLine" 
                                        name="maxVS" type="number" min={this.state.minVS} max="100"
                                        value={this.props.parameters.maxVS} 
                                        onChange={this.props.changeParameter}>                                        
                                </input> 
                                <div className = "OneLine">%</div>                             
                            </td>
                            <td >
                                <input  
                                        name="maxSize" type="number" min="1"
                                        value={this.props.parameters.maxSize} 
                                        onChange={this.props.changeParameter}>                                        
                                </input>
                            </td>
                        </tr>
                    </Table>

              </div>
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

    {/* <Row>
                    <Col sm={2}></Col>
                    <Col sm={3}>Limit M.H.S</Col>
                    <Col sm={3}> Limit V.S</Col>
                    <Col sm={4}>Limit TIRP Size</Col>                  
                </Row>

                <Row>
                    <Col sm={2}>min</Col>
                    <Col sm={3}>
                        <input type="number" value={this.state.minHS} ></input>
                    </Col>
                    <Col sm={3}>
                      <input type="number" value={this.state.minVS}></input>%
                    </Col>
                    <Col sm={4}>
                        <input type="number" value={this.state.minSize}></input>
                    </Col>                  
                </Row>

                <Row>
                    <Col sm={2}>max</Col>
                    <Col sm={3}>
                        <input type="number"  ></input>
                    </Col>
                    <Col sm={3}>
                      <input type="number" value={this.state.maxVS}></input>%
                    </Col>
                    <Col sm={4}>
                        <input type="number" value={this.state.maxSize}></input>
                    </Col>                  
                </Row> */}