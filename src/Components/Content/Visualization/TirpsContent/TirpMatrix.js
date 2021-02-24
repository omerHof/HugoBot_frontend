import React, { Component } from "react";
import "../../../../resources/style/popup.css";

class TirpMatrix extends Component {
  state = {};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default TirpMatrix;
