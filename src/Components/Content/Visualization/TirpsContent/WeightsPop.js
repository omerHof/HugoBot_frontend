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
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WeightsForm onUpdate={this.changeWeightsValue2} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default WeightsPop;
