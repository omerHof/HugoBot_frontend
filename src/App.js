import React, {Component} from "react";

import Content from "./Components/Content/Content";
import Footer from "./Components/Navbars/Footer";
import Navigation from "./Components/Navbars/Navigation";

import UserContext from "./contexts/userContext";

class App extends Component {

    state = {
        user: null
    };

    setUser = (user) => {
        this.setState( {user});
    };

    render() {
        return (
            <div className="App">
                <UserContext.Provider value={{
                    user: this.state.user,
                    setUser: this.setUser,
                }}>
                    <Navigation/>
                    <br/>
                    <br/>
                    <br/>
                    <Content/>
                    <br/>
                    <Footer/>
                </UserContext.Provider>
            </div>
        );
    }
}

export default App;
