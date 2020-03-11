import React, { Component } from "react";

import {Container} from "react-bootstrap";
import { Router, Redirect, Route, Switch} from "react-router-dom";

import history from "./Tables/History";
import Login from "../Login/Login";
import Manage from "./Manage";
import Register from "../Login/Register";
import TableContent from "./Tables/TableContent"
import Tutorial from "./Tutorial";
import '../../resources/style/colors.css';

class Content extends Component{
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path={"/Home"}>
                        <TableContent/>
                    </Route>
                    <Route path="/Tutorial">
                        <Container>
                            <Tutorial/>
                        </Container>
                    </Route>
                    <Route path="/Manage">
                        <Container>
                            <Manage/>
                        </Container>
                    </Route>
                    <Route path="/Register">
                        <Container>
                            <Register/>
                        </Container>
                    </Route>
                    <Route path="/Login">
                        <Container>
                            <Login/>
                        </Container>
                    </Route>
                    <Redirect from={"/"} to={"/Home"}/>
                </Switch>
            </Router>
        );
    }
}

export default Content;

