import React, { Component } from "react";

import {Container} from "react-bootstrap";
import {Link, Router} from "react-router-dom";

import History from "../../../History";
import '../../../resources/style/colors.css';
import '../../../resources/style/workflow.css';
import UserContext from "../../../contexts/userContext";

class Workflow extends Component{
    constructor(props) {
        super(props);
        if ("dataSet" in sessionStorage){

        }
        else{sessionStorage.setItem("dataSet","false");}
    }


    render() {
        let  that = this;
        window.addEventListener("ReloadDataSet", function(){that.forceUpdate()});
        return (
            <Container>
                <Router history={History}>
                    {sessionStorage.getItem("dataSet").localeCompare("true")==0 ? (
                        <div>
                            <Link to={"/Upload/Metadata"} className="btn bg-hugobot btn-arrow-right">
                                Info
                            </Link>
                            <Link to={"/Home/Disc"} className="btn bg-hugobot btn-arrow-right">
                                Temporal Abstraction
                            </Link>
                            <Link to={"/Home/TIM"} className="btn bg-hugobot btn-arrow-right">
                                Time Interval Mining
                            </Link>
                            <Link to={"/Home/Visualization"} className="btn bg-hugobot btn-arrow-right">
                                Visualization
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link className="btn bg-hugobot btn-arrow-right">
                                Info
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right">
                                Temporal Abstraction
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right">
                                Time Interval Mining
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right">
                                Visualization
                            </Link>
                        </div>
                    )}
                </Router>
            </Container>
        );
    }
}
export default Workflow;
