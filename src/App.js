import React, { Component } from "react";
import Navigation from "./Components/Navbars/Navigation";
import Content from "./Components/Content/Content";
import Footer from "./Components/Navbars/Footer";

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
