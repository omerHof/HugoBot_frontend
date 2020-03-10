import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import '../../../resources/style/colors.css';
import '../../../resources/style/workflow.css';
import {Link, Router} from "react-router-dom";
import History from "./History";

class Workflow extends Component{
    render() {
        return (
            <Container>
                <Router history={History}>
                    <Link to={"/Home/Info"} className="btn bg-hugobot btn-arrow-right">
                        Dataset Upload
                    </Link>
                    <Link to={"/Home/Disc"} className="btn bg-hugobot btn-arrow-right">
                        Temporal Abstraction
                    </Link>
                    <Link to={"/Home/TIM"} className="btn bg-hugobot btn-arrow-right">
                        Time Interval Mining
                    </Link>
                    <Link to={"/"} className="btn bg-hugobot btn-arrow-right">
                        Visualization
                    </Link>
                </Router>
            </Container>
        );
    }
}
export default Workflow;