import React, { Component } from "react";

import Content from "./Components/Content/Content";
import Footer from "./Components/Navbars/Footer";
import Navigation from "./Components/Navbars/Navigation";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navigation />
                <br/>
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
