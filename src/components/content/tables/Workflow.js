import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import '../../layout/colors.css';
import './workflow.css';
import Nav from "react-bootstrap/Nav";

class Workflow extends Component{
    render() {
        return (
            <Container>
                <Nav.Link href={"/Home/Info"} className="btn bg-hugobot btn-arrow-right">
                    Dataset Upload
                </Nav.Link>
                <Nav.Link href={"/Home/Disc"} className="btn bg-hugobot btn-arrow-right">
                    Temporal Abstraction
                </Nav.Link>
                <Nav.Link href={"/Home/TIM"} className="btn bg-hugobot btn-arrow-right">
                    Time Interval Mining
                </Nav.Link>
                <Nav.Link href={"/"} className="btn bg-hugobot btn-arrow-right">
                    Visualization
                </Nav.Link>
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