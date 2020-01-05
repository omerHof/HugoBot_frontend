import React, { Component } from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Tutorial from "./Tutorial";
import Manage from "./Manage";
import TableContent from "./tables/TableContent"
import '../layout/colors.css';

class Content extends Component{
    render(){
        return (
            <Router>
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
                    <Redirect from={"/"} to={"/Home"}/>
                </Switch>
            </Router>
        );
    }
}

export default Content;

