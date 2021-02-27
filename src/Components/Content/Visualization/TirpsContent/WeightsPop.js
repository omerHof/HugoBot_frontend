import React, { Component } from "react";
// import "../../../../resources/style/popup.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import WeightsForm from "./WeightsForm";

class WeightsPop extends Component {
  state = {
    weighted_vs: 34,
    weighted_mhs: 33,
    weighted_mmd: 33,
  };
  constructor(props) {
    super(props);
  }

  changeWeightsValue2 = (value) => {
    this.state.weighted_vs = value[0];
    this.state.weighted_mhs = value[1];
    this.state.weighted_mmd = value[2];
    this.props.onUpdate(value);
    this.props.onHide(true)
  };

  render() {
    return (
      <Modal 
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <WeightsForm onUpdate={this.changeWeightsValue2} />
        </Modal.Body>
        
      </Modal>
    );
  }
}

export default WeightsPop;
