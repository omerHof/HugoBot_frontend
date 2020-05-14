import React, { Component } from "react";

import history from "../../../History"

class WindowsCreation extends Component{

    constructor(props) {
        super(props);

        this.showElem = this.showElem.bind(this);
    }

    showElem = () => {

        history.push('/Home')

        let observation = document.getElementById("observation").value

        let predictionPeriod = document.getElementById("predictionPeriod").value

        let overlap = document.getElementById("overlap").value

        let studyDesign = document.getElementById("studyDesign").value

        let positiveWindows = document.getElementById("positiveWindows").value

        let negativeWindowsCase = document.getElementById("negativeWindowsCase").value

        let negativeWindowsControl = document.getElementById("negativeWindowsControl").value

        let positiveRatio = document.getElementById("positiveRatio").value

        let negativeRatio = document.getElementById("negativeRatio").value

        if(observation === "")
            observation = "21"
        if(predictionPeriod === "")
            predictionPeriod = "7"
        if(overlap === "")
            overlap = "14"
        if(studyDesign === "")
            studyDesign = "CaseControl"
        if(positiveWindows === "")
            positiveWindows = "1"
        if(negativeWindowsCase === "")
            negativeWindowsCase = "4"
        if(negativeWindowsControl === "")
            negativeWindowsControl = "4"
        if(positiveRatio === "")
            positiveRatio = "6"
        if(negativeRatio === "")
            negativeRatio = "1"

        const parameters =  {
            "observation": observation,
            "predictionPeriod" : predictionPeriod,
            "overlap" : overlap,
            "studyDesign" : studyDesign,
            "positiveWindows" : positiveWindows,
            "negativeWindowsCase" : negativeWindowsCase,
            "negativeWindowsControl" : negativeWindowsControl,
            "positiveRatio" : positiveRatio ,
            "negativeRatio" : negativeRatio
        }

        window.alert("hi hello")

        const xhr = new XMLHttpRequest();
        // open request
        xhr.open('POST', 'http://localhost:8089/createTmpWindows' , false);
        // set `Content-Type` header
        xhr.setRequestHeader('Content-Type', 'application/json');

        // send request with JSON payload

        xhr.send(JSON.stringify(parameters));

    }

    render() {
        return (
            <div className={"container"} >
                <div className={"row mt-4"}>
                    <div className={"col-sm-12"}>
                        <div className={"card bg-light"}
                             // style={"opacity: 0.85"}
                        >
                            <article className={"card-body"}>
                                <form name={"queryform"}>

                                    <h5 className={"card-title text-center mb-4 mt-1"}>Time Windows</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder="Observation"
                                               type={"text"}
                                               id={"observation"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Prediction Period"}
                                               type={"text"}
                                               id={"predictionPeriod"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name=""
                                               className={"form-control"}
                                               placeholder={"Overlap"}
                                               type={"text"}
                                               id={"overlap"}
                                        />
                                    </div>

                                    <h5 className={"card-title text-center mb-4 mt-1"}>Study Design</h5>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Study Design"}
                                               type={"text"}
                                               id={"studyDesign"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"# of Positives Windows"}
                                               type={"text"}
                                               id={"positiveWindows"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"# of Negative Windows (case)"}
                                               type={"text"}
                                               id={"negativeWindowsCase"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"# of Negative Windows (control)"}
                                               type={"text"}
                                               id={"negativeWindowsControl"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Positive"}
                                               type={"text"}
                                               id={"positiveRatio"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Negative"}
                                               type={"text"}
                                               id={"negativeRatio"}
                                        />
                                    </div>

                                    <div className={"form-group mb-5"}>
                                        <button type={"submit"}
                                                className={"btn btn-hugobot btn-block"}
                                                ref={"#!options"}
                                                onClick={this.showElem}
                                        >
                                            Temporal Window Creation
                                        </button>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WindowsCreation;