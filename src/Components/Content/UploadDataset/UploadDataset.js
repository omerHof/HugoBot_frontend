import React, { Component } from "react";

import {Container} from "react-bootstrap";
import {Route, Router} from "react-router-dom";

import '../../../resources/style/colors.css';
import UploadWorkflow from "./UploadWorkflow";
import history from "../Tables/History";
import Metadata from "./Metadata";
import VMapFile from "./VMapFile";
import EntitiesFile from "./EntitiesFile";

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
            </Router>
        );
    }
}
export default UploadDataset;