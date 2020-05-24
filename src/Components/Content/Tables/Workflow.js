import React, { Component } from "react";

import {Container} from "react-bootstrap";
import {Link, Router} from "react-router-dom";

import History from "../../../History";
import '../../../resources/style/colors.css';
import '../../../resources/style/workflow.css';

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
            <Container fluid={true}>
                <Router  history={History}>
                    {sessionStorage.getItem("dataSet").localeCompare("true")===0 ? (
                        <div>
                            <Link className="btn bg-hugobot btn-arrow-right"
                                  id={"Info"}
                                  to={"/Home/Info"}>
                                {sessionStorage.getItem('datasetName') + ' '}Info
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right"
                                  id={"Disc"}
                                  to={"/Home/Disc"} >
                                Temporal Abstraction
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right"
                                  id={"KarmaLego"}
                                  to={"/Home/KarmaLego"} >
                                Run KarmaLego
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right"
                                  id={"Classify"}
                                  to={"/Home/Classifiers"} >
                                Classification
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right"
                                  id={"TIM"}
                                  to={"/Home/TIM"} >
                                Time Intervals Mining
                            </Link>
                            <Link className="btn bg-hugobot btn-arrow-right"
                                  id={"Visual"}
                                  to={"/Home/Visualization"} >
                                Visualization
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="btn bg-hugobot btn-arrow-right"
                                 id={"Disc"}>
                                Info
                            </div>
                            <div className="btn bg-hugobot btn-arrow-right"
                                 id={"Disc"}>
                                Temporal Abstraction
                            </div>
                            <div className="btn bg-hugobot btn-arrow-right"
                                 id={"KarmaLego"}>
                                Run KarmaLego
                            </div>
                            <div className="btn bg-hugobot btn-arrow-right"
                                 id={"Classify"}>
                                Classification
                            </div>
                            <div className="btn bg-hugobot btn-arrow-right"
                                 id={"TIM"}>
                                Time Intervals Mining
                            </div>
                            <div className="btn bg-hugobot btn-arrow-right"
                                 id={"Visual"}>
                                Visualization
                            </div>
                        </div>
                    )}
                </Router>
            </Container>
        );
    }
}
export default Workflow;
