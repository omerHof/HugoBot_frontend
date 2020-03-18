import React, { Component } from "react";
import {Link, Router} from "react-router-dom";
import History from "../../../History";
import Container from "react-bootstrap/Container";
import {Nav} from "react-bootstrap";

class Manage extends Component{

    renderMyDatasets = () => {
        return(
            <p>

            </p>
        );
    };

    render() {
        return (
            <Container fluid={true}>
                <br/>
                <br/>
                <Nav variant={"tabs"}>
                    <Router history={History}>
                        <Link to={"/Manage"} className={"nav-link btn-hugobot"} onClick={this.renderMyDatasets}>
                            My Datasets
                        </Link>
                        <Link to={"/Manage"} className={"nav-link btn-hugobot"}>
                            Shared with me
                        </Link>
                        <Link to={"/Manage"} className={"nav-link btn-hugobot"}>
                            Pending Approval
                        </Link>
                    </Router>
                </Nav>
                <br/>
                {/*here we need to render the table according to the button pressed*/}
            </Container>
        );
    }
}
export default Manage;