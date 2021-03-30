import React, { Component } from "react";
import { Card, Form, Row, Button, Col } from "react-bootstrap";

class PsearchAxisPop extends Component {
    state = {
        measureToAxis: {},
        axisToMeasure: {}        
    };

    constructor(props) {
        super(props);
        this.state.measureToAxis = props.measureToAxis;
        this.state.axisToMeasure = props.axisToMeasure;
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.checkSimilarity()){
            window.alert("All Values Must Be Different!");
        }
        else{
            this.props.onUpdate(this.state.measureToAxis, this.state.axisToMeasure);
        }
        
    }

    checkSimilarity =() => {
        let ans = false;
        const indexes = new Set(Object.values(this.state.measureToAxis))
        if(indexes.size!=4){
            ans = true;
        }
        return ans;
    }

    onChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        if (Number(name)) {
            name = Number(name);
            this.state.measureToAxis[val] = name;
            this.state.axisToMeasure[name] = val;
        }
    }  

    render() {       

        return (

          <div className="axis">
                <Row>  
                     <Col>
                        <Form.Label className={"text-bold-black"} >X Axis</Form.Label>
                        <Form.Control name="1" as="select" defaultValue={this.state.axisToMeasure[1]} onChange={this.onChange.bind(this)}>
                            <option value="vs0">V.S. Class 0</option>
                            <option value="vs1">V.S. Class 1</option>
                            <option value="dmmd">Delta M.M.D</option>
                            <option value="dmhs">Delta M.H.S</option>
                        </Form.Control>
                    </Col>
              
                    <Col>
                        <Form.Label className={"text-bold-black fat_label"}>Y Axis </Form.Label>
                        <Form.Control name="2" as="select" defaultValue={this.state.axisToMeasure[2]} onChange={this.onChange.bind(this)}>
                            <option value="vs0">V.S. Class 0</option>
                            <option value="vs1">V.S. Class 1</option>
                            <option value="dmmd">Delta M.M.D</option>
                            <option value="dmhs">Delta M.H.S</option>
                        </Form.Control>
                    </Col>
              
                    <Col>
                        <Form.Label className={"text-bold-black"}>Bubble Color </Form.Label>
                        <Form.Control name="3" as="select" defaultValue={this.state.axisToMeasure[3]} onChange={this.onChange.bind(this)}>
                            <option value="vs0">V.S. Class 0</option>
                            <option value="vs1">V.S.t Class 1</option>
                            <option value="dmmd">Delta M.M.D</option>
                            <option value="dmhs">Delta M.H.S</option>
                        </Form.Control>
                    </Col>
              
                    <Col>
                        <Form.Label className={"text-bold-black"}>Bubble Size </Form.Label>
                        <Form.Control name="4" as="select" defaultValue={this.state.axisToMeasure[4]} onChange={this.onChange.bind(this)}>
                            <option value="vs0">V.S. Class 0</option>
                            <option value="vs1">V.S. Class 1</option>
                            <option value="dmmd">Delta M.M.D</option>
                            <option value="dmhs">Delta M.H.S</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label className={"text-bold-black"}></Form.Label>
                        <center>
                            <Button className={"bg-hugobot fix-margin"} onClick={this.onSubmit.bind(this)}>
                                Set
                            </Button>
                        </center>
                    </Col>
                </Row>
          </div>


        );
    }
}

export default PsearchAxisPop;
