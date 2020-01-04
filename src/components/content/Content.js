import React, { Component } from "react";
import MyHomeTable from "./tables/DisplayTableHome.js";
import Tutorial from "./Tutorial";
import PostData from "./tables/Sample-JSON.json";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '../layout/colors.css';
import Workflow from "../layout/Workflow";
import Manage from "./Manage";
import Container from "react-bootstrap/Container";

class Content extends Component{
    state = {
        HomeTable: []
    };

    MakeTable = (TableName) => {
        this.setState({
            HomeTable: JSON.parse(JSON.stringify(PostData))
        });
    };


    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { HomeTable: PostData };
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact={true} path={"/"}>
                        <Workflow/>
                        <br/>
                        <br/>
                        <Container>
                            <MyHomeTable
                                HomeTable={this.state.HomeTable}
                            />
                        </Container>
                    </Route>
                    <Route path="/tutorial">
                        <Container>
                            <Tutorial/>
                        </Container>
                    </Route>
                    <Route path="/manage">
                        <Container>
                            <Manage/>
                        </Container>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Content;

