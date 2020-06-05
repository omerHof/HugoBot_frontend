import React, { Component } from "react";

import {Container} from "react-bootstrap";
import {Link, HashRouter} from "react-router-dom";

import History from "../../../History";
import '../../../resources/style/colors.css';
import '../../../resources/style/workflow.css';

/**
 * this the sub-main workflow of the site.
 * it contains the time interval minings page, the info page,
 * the discretization page and the visualization page
 */

class Workflow extends Component{
    constructor(props) {
        super(props);
        if ("dataSet" in sessionStorage){

        }
        else{sessionStorage.setItem("dataSet","false");}
    }

    changeTab = (e) =>{
        sessionStorage.setItem("Workflow",e.target.id);
        this.forceUpdate();
    }

    render() {
        let  that = this;
        window.addEventListener("ReloadDataSet", function(){that.forceUpdate()});
        console.log("Info: " + sessionStorage.getItem("Workflow"))
        return (
            <Container fluid={true}>
                <HashRouter   history={History}>
                    {sessionStorage.getItem("dataSet").localeCompare("true")===0 ? (
                        <div>
                            <Link className={sessionStorage.getItem("Workflow").localeCompare("Info") === 0 ?
                                "btn btn-workflow-active btn-arrow-right" :
                                "btn btn-workflow btn-arrow-right"}
                                  id={"Info"}
                                  onClick={this.changeTab}
                                  to={"/Home/Info"}>
                                {sessionStorage.getItem('datasetName') + ' '}Info
                            </Link>
                            <Link className={sessionStorage.getItem("Workflow").localeCompare("Disc") === 0 ?
                                "btn btn-workflow-active btn-arrow-right" :
                                "btn btn-workflow btn-arrow-right"}
                                  id={"Disc"}
                                  onClick={this.changeTab}
                                  to={"/Home/Disc"} >
                                Temporal Abstraction
                            </Link>
                            <Link className={sessionStorage.getItem("Workflow").localeCompare("KarmaLego") === 0 ?
                                "btn btn-workflow-active btn-arrow-right" :
                                "btn btn-workflow btn-arrow-right"}
                                  id={"KarmaLego"}
                                  onClick={this.changeTab}
                                  to={"/Home/KarmaLego"} >
                                Run Windows
                            </Link>
                            <Link className={sessionStorage.getItem("Workflow").localeCompare("Classify") === 0 ?
                                "btn btn-workflow-active btn-arrow-right" :
                                "btn btn-workflow btn-arrow-right"}
                                  id={"Classify"}
                                  onClick={this.changeTab}
                                  to={"/Home/Classifiers"} >
                                Classification
                            </Link>
                            <Link className={sessionStorage.getItem("Workflow").localeCompare("TIM") === 0 ?
                                "btn btn-workflow-active btn-arrow-right" :
                                "btn btn-workflow btn-arrow-right"}
                                  id={"TIM"}
                                  onClick={this.changeTab}
                                  to={"/Home/TIM"} >
                                Time Intervals Mining
                            </Link>
                            <Link className={sessionStorage.getItem("Workflow").localeCompare("Visual") === 0 ?
                                "btn btn-workflow-active btn-arrow-right" :
                                "btn btn-workflow btn-arrow-right"}
                                  id={"Visual"}
                                  onClick={this.changeTab}
                                  to={"/Home/Visualization"} >
                                Visualization
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="btn btn-workflow btn-arrow-right"
                                 id={"Disc"}>
                                Info
                            </div>
                            <div className="btn btn-workflow btn-arrow-right"
                                 id={"Disc"}>
                                Temporal Abstraction
                            </div>
                            <div className="btn btn-workflow btn-arrow-right"
                                 id={"KarmaLego"}>
                                Run Windows
                            </div>
                            <div className="btn btn-workflow btn-arrow-right"
                                 id={"Classify"}>
                                Classification
                            </div>
                            <div className="btn btn-workflow btn-arrow-right"
                                 id={"TIM"}>
                                Time Intervals Mining
                            </div>
                            <div className="btn btn-workflow btn-arrow-right"
                                 id={"Visual"}>
                                Visualization
                            </div>
                        </div>
                    )}
                </HashRouter>
            </Container>
        );
    }
}
export default Workflow;
