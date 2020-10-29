import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import { NavLink, HashRouter } from "react-router-dom";

import History from "../../../History";
import "./visualization.css";

/**
 * this class is shown the navigation in the tirps functions
 */

class TirpsNavigation extends Component {
    render() {
        return (
            <HashRouter history={History}>
                <Navbar fixed={"top"} className={"navbar-tirps"} variant={"light"}>
                    <ul>
                        <li>
                            <NavLink to={"/TirpsApp/DatasetInfo"}>
                                <i class="fas fa-info"></i> Dataset Information
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/Analysis"}>
                            <i class="fas fa-chart-line"></i> Analysis
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/States"}>
                            <i class="fas fa-bars"></i> States
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/Entities"}>
                                <i class="fas fa-indent"></i> Entities
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/TIRPs"}>
                            <i class="fas fa-tree"></i> TIRPs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/DiscriminativeTIRPs"}>
                            <i class="fas fa-tree"></i> Discriminative TIRPs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/TIRPsSearch"}>
                            <i class="fas fa-search"></i> TIRPs Search
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/PTIRPsSearch"}>
                            <i class="fas fa-search"></i> PTIRPs Search
                            </NavLink>
                        </li>
                        
                    </ul>
                </Navbar>
            </HashRouter>
        );
    }
}

export default TirpsNavigation;
