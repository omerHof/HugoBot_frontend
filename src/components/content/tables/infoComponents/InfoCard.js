import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../../layout/colors.css"

class InfoCard extends Component{
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        <i className="fas fa-info"/> Basic Information
                    </Card.Text>
                </Card.Header>
                <Card.Body as={"small"}>
                    <Card.Text>
                        <b>Dataset name:</b> Sepsis
                    </Card.Text>
                    <Card.Text>
                        <b>Category:</b> Medical
                    </Card.Text>
                    <Card.Text>
                        <b>Owner:</b> razshtrauchler
                    </Card.Text>
                    <Card.Text>
                        <b>Source:</b> Unknown
                    </Card.Text>
                    <Card.Text>
                        <b>Description:</b> A dataset containing patients
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default InfoCard;