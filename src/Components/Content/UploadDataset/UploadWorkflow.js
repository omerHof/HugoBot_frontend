import React, { Component } from "react";

import {ButtonGroup, Container} from "react-bootstrap";
import {Link, Router} from "react-router-dom";

import History from "../../../History";
import '../../../resources/style/upload_workflow.css'


class UploadWorkflow extends Component{
    render() {
        return (
            <Container fluid={true}>
                <Router history={History}>
                    <ButtonGroup  size={"lg"}>
                        <Link to={"/Upload/Metadata"} className="btn btn-upload btn-hugobot">
                            Step-1 Upload Dataset File
                        </Link>
                        <Link to={"/Upload/VMap"} className="btn btn-upload btn-hugobot">
                            Step-2 Upload VMap File
                        </Link>
                        <Link to={"/Upload/Entities"} className="btn btn-upload btn-hugobot">
                            Step-3 Upload Entities File
                        </Link>
                        <Link to={"/Upload/WindowsCreation"} className="btn btn-upload btn-hugobot">
                            Step-4 Window Creation
                        </Link>
                    </ButtonGroup>
                </Router>
            </Container>
        );
    }
}
export default UploadWorkflow;