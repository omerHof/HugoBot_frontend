import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './colors.css';

class Navigation extends Component{
    render() {
        return (
            <Router>
                <Navbar className={"bg-hugobot"} variant={"dark"}>
                    <div className={"navbar navbar-left"}>
                        <Nav.Link href="/">
                            <i className="fas fa-home"/> Home
                        </Nav.Link>
                        <Nav.Link href="/">
                            <i className="fas fa-book-open"/> Tutorial
                        </Nav.Link>
                    </div>
                    <div className={"row justify-content-center"}>
                        <Navbar.Brand>
                            <Nav.Link href="/">
                                <h4>HugoBot</h4>
                            </Nav.Link>
                        </Navbar.Brand>
                    </div>
                    <div className={"navbar navbar-right"}>
                        <Nav.Link href="/">
                            <i className="fas fa-lock"/> Account
                        </Nav.Link>
                        <Nav.Link href="/">
                            <i className="fas fa-sign-out-alt"/> Sign Out
                        </Nav.Link>
                    </div>
                </Navbar>
            </Router>
        );
    }
}
export default Navigation;