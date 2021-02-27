import React, { Component} from "react";
import {Card, Form, Row,Button,Col} from "react-bootstrap";

class WeightsForm extends Component {
  
  constructor() {
    super();
    this.state = {
      weighted_vs: 34,
      weighted_mhs: 33,
      weighted_mmd:33,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    if ((this.state.weighted_vs + this.state.weighted_mhs+this.state.weighted_mmd)!==100){
      alert("all inputs must reach total of 100%");
    }
    let weightedAsArray = []
    weightedAsArray.push(this.state.weighted_vs)
    weightedAsArray.push(this.state.weighted_mhs)
    weightedAsArray.push(this.state.weighted_mmd)
    this.props.onUpdate(weightedAsArray);
  }

  onChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    if (Number(val)){
      val = Number(val);
      this.setState({[name]: val}); 
    }else{
      alert("all inputs must be a number");
    }
  }


  render(){
    return(
      <>
      <Card>
        <Card.Header className={"bg-hugobot"}>
          <Card.Text className={"text-hugobot text-hugoob-advanced"}>
            Select Weights{" "}
          </Card.Text>
        </Card.Header>
        <Card.Body>

        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col >
            <Form.Label className={"text-bold-black"} >Vertical Support</Form.Label>
            <Form.Control type = 'number' name="weighted_vs" placeholder="34" onChange={this.onChange} />
            </Col>
            <Col>
            <Form.Label className={"text-bold-black fat_label"}>Mean Horizontal Support </Form.Label>
            <Form.Control type = 'number' name = "weighted_mhs" placeholder="33" onChange={this.onChange} />
            </Col>
            <Col className={"margin_it"}>
            <Form.Label className={"text-bold-black"}>Mean Mean Duration </Form.Label>
            <Form.Control type = 'number' name = "weighted_mmd" placeholder="33" onChange={this.onChange} />
            </Col>
            <Col>
            <Button className={"bg-hugobot fix-margin"} type="submit">
              Submit
            </Button>
            </Col>
          </Row>
        </Form>

        </Card.Body>
        </Card>
    </>
    )
  }
}

export default WeightsForm;