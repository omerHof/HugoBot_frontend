import React, { Component } from "react";

import history from "../../../History"

class RunKarmaLego extends Component {

    constructor(props) {
        super(props);

        this.nothing = this.nothing.bind(this);
        this.showElem = this.showElem.bind(this);
    }

    nothing = () => {
        window.alert("stop tickling me");
    }

    showElem = () => {

        history.push('/Home/TIM');

        let maxGap = document.getElementById("maxGap").value
        let classParam = document.getElementById("classParam").value
        let epsilon = document.getElementById("epsilon").value
        let relations = document.getElementById("relations").value
        let skipFollowers = document.getElementById("skipFollowers").value
        let oneSize = document.getElementById("oneSize").value
        let minVertical = document.getElementById("minVertical").value
        let maxTrip = document.getElementById("maxTrip").value

        if(maxGap === "")
            maxGap = "7"
        if(classParam === "")
            classParam = "False"
        if(epsilon === "")
            epsilon = "0"
        if(relations === "")
            relations = "3"
        if(skipFollowers === "")
            skipFollowers = "True"
        if(oneSize === "")
            oneSize = "True"
        if(minVertical === "")
            minVertical = "0.5"
        if(maxTrip === "")
            maxTrip = "10"

        const parameters =  {
            "maxGap": maxGap,
            "classParam" : classParam,
            "epsilon" : epsilon,
            "relations" : relations,
            "skipFollowers" : skipFollowers,
            "oneSize" : oneSize,
            "minVertical" : minVertical,
            "maxTrip" : maxTrip
        }

        const xhr = new XMLHttpRequest();
        // open request
        xhr.open('POST', 'http://localhost:8089/runKarmaLego' , false);
        // set `Content-Type` header
        xhr.setRequestHeader('Content-Type', 'application/json');

        // send request with JSON payload

        xhr.send(JSON.stringify(parameters));

    }

    render(){
        return(
            <div className={"container"} >
                <div className={"row mt-4"}>
                    <div className={"col-sm-12"}>
                        <div className={"card bg-light"}
                            // style={"opacity: 0.85"}
                        >
                            <article className={"card-body"}>
                                <form name={"queryform"}>

                                    <h5 className={"card-title text-center mb-4 mt-1"}>KarmaLego Parameters</h5>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Max Gap"}
                                               type={"text"}
                                               id={"maxGap"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Class 1 only"}
                                               type={"text"}
                                               id={"classParam"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Epsilon"}
                                               type={"text"}
                                               id={"epsilon"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Relations def_3/7"}
                                               type={"text"}
                                               id={"relations"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Skip Followers"}
                                               type={"text"}
                                               id={"skipFollowers"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Need One Size"}
                                               type={"text"}
                                               id={"oneSize"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Min Vertical Support %"}
                                               type={"text"} id={"minVertical"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Max TRIP Length"}
                                               type={"text"}
                                               id={"maxTrip"}
                                        />
                                    </div>



                                    <div className={"form-group"}>
                                        <button type={"submit"}
                                                className={"btn btn-hugobot btn-block"}
                                                ref={"#!options"}
                                                onClick={this.showElem}
                                        >
                                            Continue
                                        </button>
                                        <br/>
                                        <button type={"submit"}
                                                className={"btn btn-hugobot btn-block"}
                                                onClick={this.nothing}
                                        >
                                            Alon Button (should take us to Classifier Screen)
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
export default RunKarmaLego;