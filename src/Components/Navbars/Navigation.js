import React, {Component} from "react";

import Navbar from "react-bootstrap/Navbar";
import {Link, Router} from "react-router-dom";

import History from "../Content/Tables/History";
import '../../resources/style/colors.css';

class Navigation extends Component{
    render(){
        return(
            <Router history={History}>
                <Navbar fixed={"top"} className={"bg-hugobot"} variant={"dark"}>
                    <div className={"navbar navbar-left"}>
                        <Link to={"/"}>
                            <i className="fas fa-home"/> Home &nbsp;
                        </Link>
                        <Link to={"/Tutorial"}>
                            <i className="fas fa-book-open"/> Tutorial
                        </Link>
                    </div>
                    <div className={"row justify-Content-center"}>
                        <Navbar.Brand>
                            <Link to={"/"}>
                                <h4>HugoBot</h4>
                            </Link>
                        </Navbar.Brand>
                    </div>
                    <div className={"navbar navbar-right"}>
                        {/*<Link to={"/Manage"}>*/}
                        {/*    <i className="fas fa-user-lock"/> Account &nbsp;*/}
                        {/*</Link>*/}
                        {/*<Link to={"/"}>*/}
                        {/*    <i className="fas fa-sign-out-alt"/> Sign Out*/}
                        {/*</Link>*/}
                        <Link to={"/Register"}>
                            <i className="fas fa-user-plus"/> Sign Up &nbsp;
                        </Link>
                        <Link to={"/Login"}>
                            <i className="fas fa-sign-in-alt"/> Sign In
                        </Link>
                    </div>
                </Navbar>
            </Router>
        );
    }
}

export default Navigation;