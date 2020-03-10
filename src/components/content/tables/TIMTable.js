import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import {Button, Card, Form} from "react-bootstrap";
//import {createBrowserHistory} from "history";
class TIMTable extends Component {

    handleSubmit = (MoD,BinNo,IPGap,PAAWin,EpsilonInput,MaxGapInput,MinVerticalSupportInput) => {

        let x= JSON.parse(sessionStorage.TIMTable);

        if (EpsilonInput) {
            // window.alert(EpsilonInput.value);

            let y = {
                "MethodOfDiscretization": MoD.innerText,
                "BinsNumber": BinNo.innerText,
                "InterpolationGap": IPGap.innerText,
                "PAAWindowSize": PAAWin.innerText,
                "epsilon": EpsilonInput.value,
                "MaxGap": MaxGapInput.value,
                "VerticalSupport": MinVerticalSupportInput.value
            };
            x.rows.push(y);

            sessionStorage.setItem('TIMTable', JSON.stringify(x));
            this.forceUpdate();
        }
    };

    //<editor-fold desc="Sub-elements">
    AddRunHeadElement = (
        <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>
                Time Intervals Mining using KarmaLego
            </Card.Text>
        </Card.Header>
    );

    ExistingRunsHeadElement = (
        <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>
                Discovered Patterns
            </Card.Text>
        </Card.Header>
    );
    //</editor-fold>

    //<editor-fold desc="Render functions">
    renderAddRunHeader = () => {
        return (
            <tr>
                <td>
                    Method Of Discretization
                </td>
                <td>
                    Bins Number
                </td>
                <td>
                    Interpolation Gap
                </td>
                <td>
                    PAA Window Size
                </td>
                <td>
                    Epsilon
                </td>
                <td>
                    Max Gap
                </td>
                <td>
                    Min. Vertical Support
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderAddRunData = () => {
        let nm = 0;
        return JSON.parse(sessionStorage.DiscretizationTable).rows.map((iter) => {
            nm++;
            let MoD = "MethodOfDiscretization" + nm;
            let BinNo = "BinsNumber" + nm;
            let IPGap = "InterpolationGap" + nm;
            let PAAWin = "PAAWindowSize" + nm;
            let EpsilonInput = "EpsilonInput" + nm;
            let MaxGapInput = "MaxGapInput" + nm;
            let MinVSInput = "MinVSInput" + nm;
            return (
                <tr>
                    <td id={MoD}>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td id={BinNo}>
                        {iter.BinsNumber}
                    </td>
                    <td id={IPGap}>
                        {iter.InterpolationGap}
                    </td>
                    <td id={PAAWin}>
                        {iter.PAAWindowSize}
                    </td>
                    <td>
                        <Form.Control id={EpsilonInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={MaxGapInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={MinVSInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Button className="bg-hugobot"
                                 onClick={() => this.handleSubmit(
                                     document.getElementById(MoD),
                                     document.getElementById(BinNo),
                                     document.getElementById(IPGap),
                                     document.getElementById(PAAWin),
                                     document.getElementById(EpsilonInput),
                                     document.getElementById(MaxGapInput),
                                     document.getElementById(MinVSInput))}>
                            <i className="fas fa-play"/>Mine
                        </Button>
                    </td>
                </tr>
            )
        })
    };

    renderExistingRunsHeader = () => {
        return (
            <tr>
                <td>
                    Method Of Discretization
                </td>
                <td>
                    Bins Number
                </td>
                <td>
                    Interpolation Gap
                </td>
                <td>
                    PAA Window Size
                </td>
                <td>
                    Epsilon
                </td>
                <td>
                    Max Gap
                </td>
                <td>
                    Min. Vertical Support
                </td>
                <td>
                    Status/Download Link
                </td>
            </tr>
        );
    };

    renderExistingRunsData=()=> {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter) => {
            return (
                <tr>
                    <td>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td>
                        {iter.BinsNumber}
                    </td>
                    <td>
                        {iter.InterpolationGap}
                    </td>
                    <td>
                        {iter.PAAWindowSize}
                    </td>
                    <td>
                        {iter.epsilon}
                    </td>
                    <td>
                        {iter.MaxGap}
                    </td>
                    <td>
                        {iter.VerticalSupport}
                    </td>
                    <td>
                        {<Button className="bg-hugobot" onClick={this.toDelete}>
                            <i className="fas fa-download"/> Download
                        </Button>}
                    </td>
                </tr>
            )
        })
    };
    //</editor-fold>

    render() {
        return (
            <small>
                <Card style={{ width: 'auto' }}>
                    {this.AddRunHeadElement}
                    <Card.Body>
                            <Table hover>
                                {this.renderAddRunHeader()}
                                <tbody>
                                        {this.renderAddRunData()}
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
                <Card style={{ width: 'auto' }}>
                    {this.ExistingRunsHeadElement}
                    <Card.Body>
                        <Table hover>
                            {this.renderExistingRunsHeader()}
                            <tbody>
                                {this.renderExistingRunsData()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </small>
        )
    }
}

export default TIMTable ;