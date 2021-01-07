import React, { Component } from "react";

import { Navbar, Row } from "react-bootstrap";

import "../../resources/style/colors.css";

/**
 * this class contains the footer that Shown in the bottom of the website
 */

class Footer extends Component {
  render() {
    return (
      <Navbar fixed="bottom" className={"bg-hugobot footer-hugobot"}>
        <Row>
          Contact us: Roi: &nbsp; <code>kroi@post.bgu.ac.il</code>, &nbsp; Omer:
          &nbsp; <code>omerhof@post.bgu.ac.il</code>, &nbsp; Yiftah: &nbsp;{" "}
          <code>szoke@post.bgu.ac.il</code>
        </Row>
      </Navbar>
    );
  }
}
export default Footer;
