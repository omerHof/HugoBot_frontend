import React, {Component} from "react";

import TiprsContent from "./TirpsContent/TirpsContent";
import TirpsNavigation from "./TirpsNavigation";

/**
 * root class- every class gets its data from this class
 */

class TirpsApp extends Component {

    render() {
        return (
            <div className="TirpsApp">
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