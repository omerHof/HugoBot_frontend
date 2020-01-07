import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import '../../layout/colors.css';
import './workflow.css';
import Nav from "react-bootstrap/Nav";
import { Link} from "react-router-dom";

class Workflow extends Component{
    render() {
        return (
            <Container>
                <Link href={"/Home/Info"} className="btn bg-hugobot btn-arrow-right">
                    Dataset Upload
                </Link>
                <Link href={"/Home/Disc"} className="btn bg-hugobot btn-arrow-right">
                    Temporal Abstraction
                </Link>
                <Link href={"/Home/TIM"} className="btn bg-hugobot btn-arrow-right">
                    Time Interval Mining
                </Link>
                <Link href={"/"} className="btn bg-hugobot btn-arrow-right">
                    Visualization
                </Link>
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