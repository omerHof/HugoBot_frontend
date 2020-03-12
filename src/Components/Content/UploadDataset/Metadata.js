import React, { Component } from "react";

import {Button, Card} from "react-bootstrap";
import FormElement from "../../Login/FormElement";
import SelectElement from "../../Login/SelectElement";

class Metadata extends Component{
    render() {
        return (
            <Card>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Dataset
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <FormElement name={"Dataset Name"}/>
                    <SelectElement name={"Category"} options={["Medical","Financial","Psychological","Other"]}/>
                    <SelectElement name={"Public/Private"} options={["Public","Private"]}/>
                    <FormElement name={"Browse (todo)"}/>
                    <FormElement name={"Description"} as={"textarea"} rows={"5"}/>
                    <FormElement name={"Dataset Source"}/>
                    <Button className={"bg-hugobot"}>
                        Validate Dataset File and Proceed to Step 2
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className={"bg-hugobot"} type={"reset"}>Clear</Button>
                </Card.Body>
            </Card>
        );
    }
}
export default Metadata;