import React, { Component } from "react";

import {Button, Container} from "react-bootstrap";

class Visualization extends Component{

    sendVisualRequest = () => {
        window.alert("hello");
    };

    render() {
        return (
            <Container>
                <Button className={"btn-hugobot"} onClick={this.sendVisualRequest} type={"submit"}>
                    Visualize TIM
                </Button>
            </Container>
        );
    }
}
export default Visualization;