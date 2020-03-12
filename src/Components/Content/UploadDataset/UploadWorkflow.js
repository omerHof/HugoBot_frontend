import React, { Component } from "react";
import {ButtonGroup, Container} from "react-bootstrap";
import {Link, Router} from "react-router-dom";
import History from "../Tables/History";

class UploadWorkflow extends Component{
    render() {
        return (
            <Container>
                <Router history={History}>
                    <ButtonGroup>
                        <Link to={"/Upload/Metadata"} className="btn bg-hugobot">
                            Step 1 <br/> Upload Dataset File
                        </Link>
                        <Link to={"/Upload/VMap"} className="btn bg-hugobot">
                            Step 2 <br/> Upload VMap File
                        </Link>
                        <Link to={"/Upload/Entities"} className="btn bg-hugobot">
                            Step 3 <br/> Upload Entities File
                        </Link>
                    </ButtonGroup>
                </Router>
            </Container>
        );
    }
}
export default UploadWorkflow;