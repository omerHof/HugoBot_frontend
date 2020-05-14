import React, { Component } from "react";

import {Route, Router} from "react-router-dom";

import EntitiesFile from "./EntitiesFile";
import history from "../../../History";
import Metadata from "./Metadata";
import UploadWorkflow from "./UploadWorkflow";
import VMapFile from "./VMapFile";
import WindowsCreation from "../Integration/WindowsCreation";
import '../../../resources/style/colors.css';

class UploadDataset extends Component{
    render() {
        return (
            <Router history={history}>
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
            </Router>
        );
    }
}
export default UploadDataset;