import React, { Component } from "react";
import { Router, Redirect, Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Tutorial from "./Tutorial";
import Manage from "./Manage";
import TableContent from "./Tables/TableContent"
import '../../resources/style/colors.css';
import history from "./Tables/History";


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
                    <Redirect from={"/"} to={"/Home"}/>
                </Switch>
            </Router>
        );
    }
}

export default Content;

