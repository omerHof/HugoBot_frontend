import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../../layout/colors.css"

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
                        Size: 2.444 MB
                    </Card.Text>
                    <Card.Text>
                        # Views: 73
                    </Card.Text>
                    <Card.Text>
                        # Downloads: 7
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default StatsCard;