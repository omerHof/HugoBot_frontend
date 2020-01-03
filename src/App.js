import React, { Component } from "react";
import Navigation from "./components/layout/Navigation";
import Workflow from "./components/layout/Workflow";
import Content from "./components/content/Content";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navigation />
                <br/>
                <br/>
                <Workflow/>
                <br/>
                <Content/>
            </div>
        );
    }
}
export default App;
