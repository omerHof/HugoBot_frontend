import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import { Link, HashRouter } from "react-router-dom";


import History from '../../../History'
import '../../../resources/style/colors.css'


/**
 * this class is shown the navigation in the tirps functions
 */

class TirpsNavigation extends Component {

    constructor(props) {
        super(props);
        // if ("user" in sessionStorage) {

        // }
        // else { sessionStorage.setItem("user", "false"); }
    }

    render() {
        return (            
            <HashRouter history={History}>
                <Navbar fixed={"top"} className={"navbar-tirps"} variant={"dark"}>
                    <div className={"navbar navbar-left"}>
                        <Link to={"/entities"}>
                            <i className={"fa fa-users"} /> entities
                        </Link>                       
                    </div>                   
                </Navbar>
            </HashRouter>
        )

    }
}

export default TirpsNavigation;