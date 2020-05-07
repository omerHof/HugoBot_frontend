import React, { Component } from "react";

import {Card} from "react-bootstrap";

import "../../../../resources/style/colors.css"

class StatsCard extends Component{
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        <i className="fas fa-chart-pie"/> Statistics
                    </Card.Text>
                </Card.Header>
                <Card.Body as={"small"}>
                    <Card.Text>
                        Size: {this.props.Size}
                    </Card.Text>
                    <Card.Text>
                        # Views: {this.props.Views}
                    </Card.Text>
                    <Card.Text>
                        # Downloads: {this.props.Downloads}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default StatsCard;