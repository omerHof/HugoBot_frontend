import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import { Link, Route, Switch} from 'react-router-dom';
// import Home from "./Home"
// import Tutorial from "./Tutorial";
// import ManageAcc from "./ManageAcc";
// import SignOut from "./SignOut";

class Navigation extends Component{
    render() {
        return (
            <Navbar bg={"dark"} variant={"dark"}>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">Tutorial</Nav.Link>
                </Nav>
                <Navbar.Brand>
                    <Nav.Link href="/">
                        Hugobot
                    </Nav.Link>
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="/">Account</Nav.Link>
                    <Nav.Link href="/">Sign Out</Nav.Link>
                </Nav>
                {/*<Home/>*/}
                {/*<Tutorial/>*/}
                {/*<ManageAcc/>*/}
                {/*<SignOut/>*/}
            </Navbar>
        );
    }
}
export default Navigation;