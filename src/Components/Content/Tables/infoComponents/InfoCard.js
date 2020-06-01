import React, { Component } from "react";

import {Card} from "react-bootstrap";

import "../../../../resources/style/colors.css"

/**
 * in this card you can see the data set name, the category, the owner, the source and the descreption.
 */

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
                        <b>Dataset name:</b> {this.props.DatasetName}
                    </Card.Text>
                    <Card.Text>
                        <b>Category:</b> {this.props.Category}
                    </Card.Text>
                    <Card.Text>
                        <b>Owner:</b> {this.props.Owner}
                    </Card.Text>
                    <Card.Text>
                        <b>Source:</b> {this.props.Source}
                    </Card.Text>
                    <Card.Text>
                        <b>Description:</b> {this.props.Description}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default InfoCard;