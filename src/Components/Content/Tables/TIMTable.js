import React, { Component } from "react";

import {Button, ButtonGroup, Card, Form, Row, Table, ToggleButton} from "react-bootstrap";
import Axios from "axios";
//import {createBrowserHistory} from "history";

class TIMTable extends Component {

    constructor(props) {
        super(props);

        this.state ={
            Allen: new Map(),
            Class: new Map(),
        }

        this.onAllenChange = this.onAllenChange.bind(this);
        this.onClassChange = this.onClassChange.bind(this);
    }

    sendTIM = (epsilon, maxGap, verSup, Allen, discretizationID, max_tirp_length, index_same) => {
        const url = 'http://localhost:80/addTIM';
        const formData = new FormData();
        console.log(Allen)
        formData.append('Epsilon',epsilon);
        formData.append('Max Gap',maxGap);
        formData.append('min_ver_support',verSup);
        formData.append('num_relations',Allen);
        formData.append('DiscretizationId',discretizationID);
        formData.append('max Tirp Length',max_tirp_length);
        formData.append('index_same',index_same);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config);
    };

    getDataOnDataset(id){
        const url = 'http://localhost:80/getDataOnDataset?id='+id;
        return Axios.get(url);
    }


    handleSubmit = (id,PAAWin,BinNo,IPGap,MoD,EpsilonInput, naxTirpLen ,MaxGapInput,MinVerticalSupportInput) => {
        let x= JSON.parse(sessionStorage.TIMTable);
        console.log("dfbdfd")
        console.log(PAAWin)
        if (EpsilonInput) {

            //let y = {
              //  "MethodOfDiscretization": MoD.innerText,
                //"BinsNumber": BinNo.innerText,
                //"InterpolationGap": IPGap.innerText,
                //"PAAWindowSize": PAAWin.innerText,
                //"epsilon": EpsilonInput.value,
                //"MaxGap": MaxGapInput.value,
                //"VerticalSupport": MinVerticalSupportInput.value
            //};
            //x.rows.push(y);
            console.log(this.state.Allen.get("0"))
            let index_same;
            if (this.state.Class.get("0")==="3"){
                index_same = "true"
            }
            else{
                index_same = "false"
            }
            let discretizationID = id
            let max_tirp_length = naxTirpLen.value
            this.sendTIM(EpsilonInput.value,
                MaxGapInput.value,
                MinVerticalSupportInput.value,
                this.state.Allen.get("0"),
                discretizationID,
                max_tirp_length,
                index_same)
                .then((response)=>{
                    console.log(response.data);
                    if(response.status < 400){



                        this.getDataOnDataset(sessionStorage.getItem("datasetName"))
                            .then((response) => {
                                window.alert('uh oh, there\'s a problem!');
                                if (response.status < 400) {
                                    let data1= response.data["disc"];
                                    let i;
                                    let disc= {"rows": []}
                                    for (i = 0; i < data1["lengthNum"]; i++) {
                                        let y=data1[parseInt(i)];
                                        disc.rows.push(y)
                                    }
                                    let data2= response.data["karma"];
                                    let j;
                                    let karma= {"rows": []}
                                    for (j = 0; j < data2["lengthNum"]; j++) {
                                        let w=data2[parseInt(j)];
                                        karma.rows.push(w)
                                    }
                                    sessionStorage.setItem('DiscretizationTable', JSON.stringify(disc));
                                    console.log(karma)
                                    sessionStorage.setItem('TIMTable', JSON.stringify(karma));
                                    this.forceUpdate();
                                    //sessionStorage.setItem("allTables",JSON.stringify(myData));
                                    //console.log(JSON.parse(sessionStorage.allTables));
                                    //window.dispatchEvent(new Event("ReloadHomeTable"));
                                } else {
                                    window.alert('uh oh, there\'s a problem!');
                                }
                            });



                    }
                    else{
                        window.alert('uh oh, there\'s a problem!')
                    }
                })
                .catch(error => console.log(error));

            sessionStorage.setItem('TIMTable', JSON.stringify(x));
            this.forceUpdate();
        }
    };

    //<editor-fold desc="Sub-elements">
    HeadElement = (Heading) => {
        return(
            <Card.Header className={"bg-hugobot"}>
                <Card.Text className={"text-hugobot"}>
                    {Heading}
                </Card.Text>
            </Card.Header>
        );
    };

    nothing = () => {
        window.alert("stop tickling me");
    }
    //</editor-fold>

    onAllenChange = (e) => {
        let temp_map = this.state.Allen;
        temp_map.set(e.target.value.charAt(0),e.target.value.charAt(1));
        this.setState({Allen:temp_map});
        this.state.Allen.get("0")
        console.log(this.state.Allen)
    }

    onClassChange = (e) => {
        let temp_map = this.state.Class;
        temp_map.set(e.target.value.charAt(0),e.target.value.charAt(1));
        this.setState({Class:temp_map});
        let index_same;
        if (this.state.Class.get("0")==="3"){
            index_same = "true"
        }
        else{
            index_same = "false"
        }
        console.log(index_same)
    }

    //<editor-fold desc="Render functions">
    renderAddRunHeader = () => {
        return (
            <thead>
                <tr>
                    <td width={"15%"}>
                       PAA-Bins-Interpolation-Method
                    </td>
                    <td width={"5%"}>
                        Epsilon
                    </td>
                    <td width={"5%"}>
                        max tirp len
                    </td>
                    <td width={"5%"}>
                        Max Gap
                    </td>
                    <td width={"5%"}>
                        Min. Vertical Support
                    </td>
                    <td width={"10%"}>
                        No. of Allen Relations
                    </td>
                    <td width={"5%"}>
                        index same
                    </td>
                    <td width={"5%"}>
                        Status/Download Link
                    </td>
                </tr>
            </thead>
        );
    };

    renderAddRunData = () => {
        return JSON.parse(sessionStorage.DiscretizationTable).rows.map((iter, index) => {
            let Disc = "Disc" + index;
            let EpsilonInput = "EpsilonInput" + index;
            let maxTirpLenInput = "maxTirpLenInput" + index;
            let MaxGapInput = "MaxGapInput" + index;
            let MinVSInput = "MinVSInput" + index;
            let sIndex = ""+index;//because Javascript is awesome :)
            return (
                <tr key={index}>
                    <td id={Disc}>
                        {iter.PAAWindowSize+"-"
                        +iter.BinsNumber+"-"
                        +iter.InterpolationGap+"-"
                        +iter.MethodOfDiscretization}
                    </td>
                    <td>
                        <Form.Control id={EpsilonInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={maxTirpLenInput} type={"text"}>
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
                        <ButtonGroup id={"Allen"+index} toggle={true}>
                            <ToggleButton checked={this.state.Allen.has(sIndex)
                                            ? this.state.Allen.get(sIndex).localeCompare("3") === 0
                                            : true}
                                          className={"btn-hugobot"}
                                          id={"Allen3"+index}
                                          onChange={this.onAllenChange}
                                          type={"radio"}
                                          value={index+"3"}>
                                3
                            </ToggleButton>
                            <ToggleButton checked={this.state.Allen.has(sIndex)
                                            ? this.state.Allen.get(sIndex).localeCompare("7") === 0
                                            : false}
                                          className={"btn-hugobot"}
                                          id={"Allen7"+index}
                                          onChange={this.onAllenChange}
                                          type={"radio"}
                                          value={index+"7"}>
                                7
                            </ToggleButton>
                        </ButtonGroup>
                    </td>
                    <td>
                        <ButtonGroup id={"Class"+index} toggle={true}>
                            <ToggleButton checked={this.state.Class.has(sIndex)
                                ? this.state.Class.get(sIndex).localeCompare("3") === 0
                                : true}
                                          className={"btn-hugobot"}
                                          id={"Class3"+index}
                                          onChange={this.onClassChange}
                                          type={"radio"}
                                          value={index+"3"}>
                                True
                            </ToggleButton>
                            <ToggleButton checked={this.state.Class.has(sIndex)
                                ? this.state.Class.get(sIndex).localeCompare("7") === 0
                                : false}
                                          className={"btn-hugobot"}
                                          id={"Class7"+index}
                                          onChange={this.onClassChange}
                                          type={"radio"}
                                          value={index+"7"}>
                                False
                            </ToggleButton>
                        </ButtonGroup>
                    </td>
                    <td>
                        <Button className="bg-hugobot"
                                 onClick={() => this.handleSubmit(
                                     iter.id,
                                     iter.PAAWindowSize,
                                     iter.BinsNumber,
                                     iter.InterpolationGap,
                                     iter.MethodOfDiscretization,
                                     document.getElementById(EpsilonInput),
                                     document.getElementById(maxTirpLenInput),
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
            <thead>
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
                        max tirp len
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
            </thead>
        );
    };

    renderExistingRunsData = () => {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter, index) => {
            return (
                <tr key={index}>
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
                        {iter.maxTirpLength}
                    </td>
                    <td>
                        {iter.MaxGap}
                    </td>
                    <td>
                        {iter.VerticalSupport}
                    </td>
                    <td>
                        {<Button className="bg-hugobot" onClick={this.nothing}>
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
                    {this.HeadElement("Add a New Time Interval Mining Configuration")}
                    <Card.Body>
                        <Row>

                        </Row>
                    </Card.Body>
                </Card>
                <Card style={{ width: 'auto' }}>
                    {this.HeadElement("...Or Use An Existing One Instead")}
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
                    {this.HeadElement("Discovered Patterns")}
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