import React, {Component} from "react";

import TiprsContent from "./TiprsContent/TiprsContent";
import TirpsNavigation from "./TirpsNavigation";

/**
 * root class- every class gets its data from this class
 */

class TirpsApp extends Component {

    render() {
        return (
            <div className="App">
                    <TirpsNavigation/>
                    <br/>
                    <br/>
                    <br/>
                    <TiprsContent/>
                    <br/>
                  
            </div>
        );
    }
}

export default TirpsApp;