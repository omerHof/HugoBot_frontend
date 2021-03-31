import React, { Component } from "react";

import {Route, HashRouter} from "react-router-dom";

import EntitiesFile from "./EntitiesFile";
import history from "../../../History";
import Metadata from "./Metadata";
import UploadWorkflow from "./UploadWorkflow";
import VMapFile from "./VMapFile";
import WindowsCreation from "../Integration/WindowsCreation";
import '../../../resources/style/colors.css';

/**
 * this class is responsible for uploading the dataset file
 */

class UploadDataset extends Component{

    // testFunc = (e) => {
    //     window.alert(e.target.id !== undefined);
    //     window.alert(e.target.ida);
    //     let getAwayButtons = ["Info","Disc","KarmaLego","Classify","TIM","Visual"]
    //     window.alert(getAwayButtons.includes(e.target.id))
    //     if(e.target.id !== undefined && getAwayButtons.includes(e.target.id)) {
    //         if (window.confirm("This is a test message")) {
    //             console.log("confirmed.");
    //         } else {
    //             console.log("declined");
    //         }
    //     }
    // }

    render() {
        // window.addEventListener("click",this.testFunc)
        return (
            <HashRouter>
                <br/>
                <UploadWorkflow/>
                <br/>
                <Route path={"/Upload/Metadata"}>
                    <Metadata/>
                </Route>
                <Route path={"/Upload/VMap"}>
                    <VMapFile/>
                </Route>
                <Route path={"/Upload/Entities"}>
                    <EntitiesFile/>
                </Route>
                <Route path={"/Upload/WindowsCreation"}>
                    <WindowsCreation/>
                </Route>
            </HashRouter>
        );
    }
}
export default UploadDataset;