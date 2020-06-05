import React, { Component } from "react";

import history from "../../../History"

class ClassifiersSelection extends Component {

    constructor(props) {
        super(props);

        this.showElem = this.showElem.bind(this);
    }

    showElem = () => {

        window.open('#/Home', "_self");;

        let classifier = document.getElementById("classifier").value
        //KNN
        let KNN_Neighbors = document.getElementById("KNN_Neighbors").value
        //Logistic Regression
        let LR_C = document.getElementById("LR_C").value
        let LR_penalty = document.getElementById("LR_penalty").value
        let LR_verbose = document.getElementById("LR_verbose").value
        let LR_random_state = document.getElementById("LR_random_state").value

        //Random Forest
        let RF_estimators = document.getElementById("RF_estimators").value
        let RF_criterion = document.getElementById("RF_criterion").value
        let RF_minSampleSplit = document.getElementById("RF_minSampleSplit").value
        let RF_maxDepth = document.getElementById("RF_maxDepth").value
        let RF_bootstrap = document.getElementById("RF_bootstrap").value
        let RF_jobs = document.getElementById("RF_jobs").value
        let RF_classWeight = document.getElementById("RF_classWeight").value
        let RF_oobScore = document.getElementById("RF_oobScore").value
        let RF_randomState = document.getElementById("RF_randomState").value

        //XGB
        let XGB_maxDepth = document.getElementById("XGB_maxDepth").value
        let XGB_eta = document.getElementById("XGB_eta").value
        let XGB_silent = document.getElementById("XGB_silent").value
        let XGB_objective = document.getElementById("XGB_objective").value
        let XGB_randomState = document.getElementById("XGB_randomState").value
        let XGB_eval_metric = document.getElementById("XGB_eval_metric").value

        //MLP
        let MLP_activation = document.getElementById("MLP_activation").value
        let MLP_solver = document.getElementById("MLP_solver").value
        let MLP_alpha = document.getElementById("MLP_alpha").value
        let MLP_learningRate = document.getElementById("MLP_learningRate").value
        let MLP_n_iter_no_change = document.getElementById("MLP_n_iter_no_change").value
        let MLP_random_state = document.getElementById("MLP_random_state").value
        let MLP_hiddenLayers_1 = document.getElementById("MLP_hiddenLayers_1").value
        let MLP_hiddenLayers_2 = document.getElementById("MLP_hiddenLayers_2").value
        let MLP_maxIteration = document.getElementById("MLP_maxIteration").value

        //GB
        let GB_n_estimators = document.getElementById("GB_n_estimators").value
        let GB_max_leaf_nodes = document.getElementById("GB_max_leaf_nodes").value
        let GB_max_depth = document.getElementById("GB_max_depth").value
        let GB_random_state = document.getElementById("GB_random_state").value
        let GB_min_samples_split = document.getElementById("GB_min_samples_split").value


        //complete missing values
        //KNN
        if (KNN_Neighbors === "")
            KNN_Neighbors = "6"
        //Logistic Regression
        if (LR_C === "")
            LR_C = "1"
        if (LR_penalty === "")
            LR_penalty = "12"
        if (LR_verbose === "" )
            LR_verbose = "False"
        if (LR_random_state === "")
            LR_random_state = "1"
        //Random Forest
        if (RF_estimators === "" )
            RF_estimators = "100"
        if (RF_criterion === "" )
            RF_criterion = "entropy"
        if (RF_minSampleSplit === "")
            RF_minSampleSplit = "20"
        if (RF_maxDepth === "")
            RF_maxDepth = "5"
        if (RF_bootstrap === "")
            RF_bootstrap = "True"
        if (RF_jobs === "")
            RF_jobs = "-1"
        if (RF_classWeight === "")
            RF_classWeight = "balanced"
        if (RF_oobScore === "")
            RF_oobScore = "True"
        if (RF_randomState === "")
            RF_randomState = "2"
        //XGB
        if (XGB_maxDepth === "")
            XGB_maxDepth = "5"
        if (XGB_eta === "")
            XGB_eta = "0.2"
        if (XGB_silent === "")
            XGB_silent = "1"
        if (XGB_objective === "")
            XGB_objective = "binary:logistic"
        if (XGB_randomState === "")
            XGB_randomState = "2"
        if (XGB_eval_metric === "")
            XGB_eval_metric = "auc"
        //MLP
        if (MLP_learningRate === "")
            MLP_learningRate = "0.009"
        if (MLP_activation === "")
            MLP_activation = "tanh"
        if (MLP_solver === "")
            MLP_solver = "lbfgs"
        if (MLP_alpha === "")
            MLP_alpha =  "1e-5"
        if (MLP_hiddenLayers_1 === "")
            MLP_hiddenLayers_1 =  "20"
        if (MLP_hiddenLayers_2 === "")
            MLP_hiddenLayers_2 = "40"
        if (MLP_maxIteration === "")
            MLP_maxIteration = "8000"
        if (MLP_n_iter_no_change === "")
            MLP_n_iter_no_change = "80"
        if (MLP_random_state === "")
            MLP_random_state = "0"
        //GB
        if (GB_n_estimators === "")
            GB_n_estimators = "100"
        if (GB_max_leaf_nodes === "")
            GB_max_leaf_nodes = "None"
        if (GB_max_depth === "")
            GB_max_depth = "10"
        if (GB_random_state === "")
            GB_random_state =  "2"
        if (GB_min_samples_split === "")
            GB_min_samples_split = "5"








        const parameters = {
            "classifier": classifier,
            "KNN_Neighbors" : KNN_Neighbors,
            "LR_C": KNN_Neighbors,
            "LR_penalty" : LR_penalty,
            "LR_verbose" : LR_verbose,
            "LR_random_state" : LR_random_state,

            "RF_estimators" : RF_estimators,
            "RF_criterion" : RF_criterion,
            "RF_minSampleSplit" : RF_minSampleSplit,
            "RF_maxDepth" : RF_maxDepth,
            "RF_bootstrap" : RF_bootstrap,
            "RF_jobs" : RF_jobs,
            "RF_classWeight" : RF_classWeight,
            "RF_oobScore" : RF_oobScore,
            "RF_randomState" : RF_randomState,

            "XGB_maxDepth" : XGB_maxDepth,
            "XGB_eta" : XGB_eta,
            "XGB_silent" : XGB_silent,
            "XGB_objective" : XGB_objective,
            "XGB_randomState" : XGB_randomState,
            "XGB_eval_metric" : XGB_eval_metric,

            "MLP_activation" : MLP_activation,
            "MLP_solver" : MLP_solver,
            "MLP_alpha" : MLP_alpha,
            "MLP_learningRate" : MLP_learningRate,
            "MLP_hiddenLayers_1" : MLP_hiddenLayers_1,
            "MLP_hiddenLayers_2" : MLP_hiddenLayers_2,
            "MLP_n_iter_no_change" : MLP_n_iter_no_change,
            "MLP_random_state" : MLP_random_state,
            "MLP_maxIteration" : MLP_maxIteration ,

            "GB_n_estimators" : GB_n_estimators,
            "GB_max_leaf_nodes" : GB_max_leaf_nodes,
            "GB_max_depth" : GB_max_depth,
            "GB_random_state" : GB_random_state,
            "GB_min_samples_split" : GB_min_samples_split
        }

        const xhr = new XMLHttpRequest();


        // open request
        xhr.open('POST', '/api89/runClassifiers' , false);

        // set `Content-Type` header
        xhr.setRequestHeader('Content-Type', 'application/json');

        // send rquest with JSON payload
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

                                    <h5 className={"card-title text-center mb-4 mt-3"}>Classifiers Selection</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Classifiers"}
                                               type={"text"}
                                               id={"classifier"}
                                        />
                                    </div>

                                    <h5 className={"card-title text-center mb-4 mt-3"}>KNN</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Number of Neighbors"}
                                               type={"text"}
                                               id={"KNN_Neighbors"}
                                        />
                                    </div>

                                    <h5 className={"card-title text-center mb-4 mt-3"}>Logistic Regression</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"C"}
                                               type={"text"}
                                               id={"LR_C"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Penalty"}
                                               type={"text"}
                                               id={"LR_penalty"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Verbose"}
                                               type={"text"}
                                               id={"LR_verbose"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Random State"}
                                               type={"text"}
                                               id={"LR_random_state"}
                                        />
                                    </div>

                                    <h5 className={"card-title text-center mb-4 mt-3"}>Random Forest</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"N Estimators"}
                                               type={"text"}
                                               id={"RF_estimators"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Criteration"}
                                               type={"text"}
                                               id={"RF_criterion"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Min Sample split"}
                                               type={"text"}
                                               id={"RF_minSampleSplit"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Max Depth"}
                                               type={"text"}
                                               id={"RF_maxDepth"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Bootstrap"}
                                               type={"text"}
                                               id={"RF_bootstrap"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"N jobs"}
                                               type={"text"}
                                               id={"RF_jobs"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Class Weight"}
                                               type={"text"}
                                               id={"RF_classWeight"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"oob_score"}
                                               type={"text"}
                                               id={"RF_oobScore"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"RandomState"}
                                               type={"text"}
                                               id={"RF_randomState"}
                                        />
                                    </div>

                                    <h5 className={"card-title text-center mb-4 mt-3"}>XGB</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Max Depth"}
                                               type={"text"}
                                               id={"XGB_maxDepth"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Eta"}
                                               type={"text"}
                                               id ={"XGB_eta"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Silent"}
                                               type={"text"}
                                               id={"XGB_silent"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Objective"}
                                               type={"text"}
                                               id={"XGB_objective"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"RandomState"}
                                               type={"text"}
                                               id={"XGB_randomState"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Eval Metric"}
                                               type={"text"}
                                               id={"XGB_eval_metric"}
                                        />
                                    </div>



                                    <h5 className={"card-title text-center mb-4 mt-3"}>MLP</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Activation"}
                                               type={"text"}
                                               id={"MLP_activation"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Initial Learning Rate"}
                                               type={"text"}
                                               id={"MLP_learningRate"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Number of Hidden layers 1"}
                                               type={"text"}
                                               id={"MLP_hiddenLayers_1"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Number of Hidden layers 2"}
                                               type={"text"}
                                               id={"MLP_hiddenLayers_2"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Solver"}
                                               type={"text"}
                                               id={"MLP_solver"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Alpha"}
                                               type={"text"}
                                               id={"MLP_alpha"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"N iteration no change"}
                                               type={"text"}
                                               id={"MLP_n_iter_no_change"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Max Iteration"}
                                               type={"text"}
                                               id={"MLP_maxIteration"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Random State"}
                                               type={"text"}
                                               id={"MLP_random_state"}
                                        />
                                    </div>


                                    <h5 className={"card-title text-center mb-4 mt-3"}>GB</h5>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"N Estimators"}
                                               type={"text"}
                                               id={"GB_n_estimators"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Max Leaf Nodes"}
                                               type={"text"}
                                               id={"GB_max_leaf_nodes"}
                                        />
                                    </div>
                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""} className={"form-control"} placeholder={"Max Depth"} type={"text"} id={"GB_max_depth"} />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Random State"}
                                               type={"text"}
                                               id={"GB_random_state"}
                                        />
                                    </div>

                                    <div className={"form-group input-group input-group-prepend mb-5"}>
                                        <span className={"input-group-text"}> <i className={""}/> </span>
                                        <input name={""}
                                               className={"form-control"}
                                               placeholder={"Min Samples Split"}
                                               type={"text"}
                                               id={"GB_min_samples_split"}
                                        />
                                    </div>





                                    <div className={"form-group"}>
                                        <button type={"submit"}
                                                className={"btn btn-hugobot btn-block"}
                                                onClick={this.showElem}
                                                ref={"#!options"}
                                        >
                                            Run
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
export default ClassifiersSelection;