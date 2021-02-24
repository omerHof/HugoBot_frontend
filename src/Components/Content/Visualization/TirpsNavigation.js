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
            <HashRouter>
                <Navbar className={"navbar-tirps"} variant={"light"}>
                    <ul>
                        <li>
                            <NavLink to={"/TirpsApp/DatasetInfo"}>
                                <i className="fas fa-info"></i> Dataset Information
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/Analysis"}>
                            <i className="fas fa-chart-line"></i> Analysis
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/States"}>                                
                            <i className="fas fa-bars"></i> States
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/Entities"}>
                                <i className="fas fa-indent"></i> Entities
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/TIRPs"}>
                            <i className="fas fa-tree"></i> TIRPs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/DiscriminativeTIRPs"}>
                            <i className="fas fa-tree"></i> Discriminative TIRPs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/TIRPsSearch"}>
                            <i className="fas fa-search"></i> TIRPs Search
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/TirpsApp/PTIRPsSearch"}>
                            <i className="fas fa-search"></i> PTIRPs Search
                            </NavLink>
                        </li>                        
                    </ul>
                </Navbar>
            </HashRouter>
        );
    }
}

export default TirpsNavigation;
