import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import './colors.css';
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

class Footer extends Component{
    render() {
        return (
            <Navbar fixed="bottom" className={"bg-hugobot"}>
                <Row>
                    Contact us: Raz <Nav.Link>hhh</Nav.Link> Jonathan <Nav.Link>hhh</Nav.Link>
                </Row>
            </Navbar>
        );
    }
}
export default Footer;