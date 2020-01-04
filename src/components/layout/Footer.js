import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import './colors.css';
import Row from "react-bootstrap/Row";

class Footer extends Component{
    render() {
        return (
            <Navbar fixed="bottom" className={"bg-hugobot footer-hugobot"}>
                <Row>
                    Contact us: Raz: &nbsp; <code>razsht@post.bgu.ac.il</code>, &nbsp;
                    Jonathan: &nbsp; <code>shayay@post.bgu.ac.il</code>
                </Row>
            </Navbar>
        );
    }
}
export default Footer;