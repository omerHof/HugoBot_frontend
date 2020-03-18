import React, {Component} from "react";

import Navbar from "react-bootstrap/Navbar";
import {Link, Router} from "react-router-dom";

import History from "../../History";


import '../../resources/style/colors.css';
import Login from "../Login/Login";
import {login} from "../../services/authService";
import HomeData from "../Content/Tables/mainTable";

class Navigation extends Component{

    constructor(props) {
        super(props);
        if ("user" in sessionStorage){

        }
        else{sessionStorage.setItem("user", "false");}
    }

    handleSubmit =  () => {
        //this.context.setUser(null)
        sessionStorage.setItem("user","false");
        this.forceUpdate();
    };


    render(){
        let  that = this;
        window.addEventListener("ReloadTable1", function(){that.forceUpdate()});
        return(
            <Router history={History}>
                <Navbar fixed={"top"} className={"bg-hugobot"} variant={"dark"}>
                    <div className={"navbar navbar-left"}>
                        <Link to={"/"}>
                            <i className="fas fa-home"/> Home &nbsp;
                        </Link>
                        <Link to={"/"} >
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
                        {sessionStorage.getItem("user").localeCompare("true")==0 ? (
                            <div>
                                <Link to={"/Manage"} >
                                    <i className="fas fa-user-lock"/> Account &nbsp;
                                </Link>
                                <Link to={"/Login"} onClick={this.handleSubmit}>
                                    <i className="fas fa-sign-out-alt"/> Sign Out
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to={"/Register"}>
                                    <i className="fas fa-user-plus"/> Sign Up &nbsp;
                                </Link>
                                <Link to={"/Login"}>
                                    <i className="fas fa-sign-in-alt"/> Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </Navbar>
            </Router>
        );
    }
}

export default Navigation;
