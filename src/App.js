import React, { Component } from "react";
import Navigation from "./components/layout/Navigation";
import Content from "./components/content/Content";
import Footer from "./components/layout/Footer";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navigation />
                <br/>
                <br/>
                <Content/>
                <br/>
                <Footer/>
            </div>
        );
    }
}
export default App;
