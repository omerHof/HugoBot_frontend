import React, { Component } from "react";

import {ButtonGroup, Container} from "react-bootstrap";
import {Router} from "react-router-dom";

import History from "../../../History";
import '../../../resources/style/upload_workflow.css'


class UploadWorkflow extends Component{

    constructor(props) {
        super(props);

        if(!("uploadPageLoc" in sessionStorage)){
            sessionStorage.setItem("uploadPageLoc","step_1");
            window.dispatchEvent(new Event("ReIndicateActiveStep"));
        }

        this.getClassName = this.getClassName.bind(this);
    }

    getClassName = (id) => {
        let res = "btn btn-upload";
        if(sessionStorage.getItem("uploadPageLoc").localeCompare(id) === 0)
            res += "-active"
        return res;
    }

    render() {
        let that = this;
        window.addEventListener("ReIndicateActiveStep", function(){that.forceUpdate()});
        return (
            <Container fluid={true}>
                <Router history={History}>
                    <ButtonGroup  size={"lg"}>
                        <div className={this.getClassName("step_1")}>
                            Step-1 Upload Dataset File
                        </div>
                        <div className={this.getClassName("step_2")}>
                            Step-2 Upload VMap File
                        </div>
                        <div className={this.getClassName("step_3")}>
                            Step-3 Upload Entities File
                        </div>
                        <div className={this.getClassName("step_4")}>
                            Step-4 Window Creation
                        </div>
                    </ButtonGroup>
                </Router>
            </Container>
        );
    }
}
export default UploadWorkflow;