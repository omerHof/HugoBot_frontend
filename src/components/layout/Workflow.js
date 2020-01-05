import React, { Component } from "react";
import './colors.css';
import './workflow.css';
import Container from "react-bootstrap/Container";

class Workflow extends Component{
    render() {
        return (
            <Container>
                <a href="/" className="btn bg-hugobot btn-arrow-right">Dataset Upload</a>
                <a href="/" className="btn bg-hugobot btn-arrow-right">Temporal Abstraction</a>
                <a href="/" className="btn bg-hugobot btn-arrow-right">Time Interval Mining</a>
                <a href="/" className="btn bg-hugobot btn-arrow-right">Visualization</a>
            </Container>
        );
    }
}
export default Workflow;
// <div className={"wrap"}>
//     <Router>
//         <div className={"prog bg-hugobot"}>
//             <Nav.Link href="/">
//                 Dataset Upload
//             </Nav.Link>
//         </div>
//         <div className={"prog bg-hugobot"}>
//             <Nav.Link href="/">
//                 Temporal Abstraction
//             </Nav.Link>
//         </div>
//         <div className={"prog bg-hugobot"}>
//             <Nav.Link href="/">
//                 Time Interval Mining
//             </Nav.Link>
//         </div>
//         <div className={"prog bg-hugobot"}>
//             <Nav.Link href="/">
//                 Visualization
//             </Nav.Link>
//         </div>
//     </Router>
// </div>