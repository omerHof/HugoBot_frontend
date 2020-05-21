import React, { Component } from "react";

import {ButtonGroup, Container} from "react-bootstrap";
import {Router} from "react-router-dom";

import History from "../../../History";
import '../../../resources/style/upload_workflow.css'


class UploadWorkflow extends Component{
    render() {
        return (
            <Container fluid={true}>
                <Router history={History}>
                    <ButtonGroup  size={"lg"}>
                        <div className="btn btn-upload btn-hugobot">
                            Step-1 Upload Dataset File
                        </div>
                        <div className="btn btn-upload btn-hugobot">
                            Step-2 Upload VMap File
                        </div>
                        <div className="btn btn-upload btn-hugobot">
                            Step-3 Upload Entities File
                        </div>
                        <div className="btn btn-upload btn-hugobot">
                            Step-4 Window Creation
                        </div>
                    </ButtonGroup>
                </Router>
            </Container>
        );
    }
}
export default UploadWorkflow;