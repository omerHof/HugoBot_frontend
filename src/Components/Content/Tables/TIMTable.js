import React, { Component } from "react";

import {Button, ButtonGroup, Card, Form, Table, ToggleButton} from "react-bootstrap";

import Axios from "axios";
import cookies from "js-cookie";

//import {createBrowserHistory} from "history";

/**
 * this class is the time interval minings class.
 * it sends to the server number of relations, PAA, Bins, Interpolation, Method,
 * Min. Vertical Support (%), max gap, epsilon, Max TIRP Length (Integer), index same.
 * it allows you do download the tim interval minings.
 */

class TIMTable extends Component {

    constructor(props) {
        super(props);

        this.state ={
            Allen: new Map(),
            Class: new Map(),
        }

        this.onAllenChange = this.onAllenChange.bind(this);
        this.onClassChange = this.onClassChange.bind(this);
        this.sendDownloadRequest = this.sendDownloadRequest.bind(this);
        this.handleDownloadRequest = this.handleDownloadRequest.bind(this);
        this.sendDownloadRequest0 = this.sendDownloadRequest0.bind(this);
        this.handleDownloadRequest0 = this.handleDownloadRequest0.bind(this);
        this.sendDownloadRequest1 = this.sendDownloadRequest1.bind(this);
        this.handleDownloadRequest1 = this.handleDownloadRequest1.bind(this);
    }

    sendDownloadRequest(id){
        const url = 'http://localhost:80/getTIM';
        const formData = new FormData();
        formData.append('kl_id',id);
        formData.append('class_num','KL.txt');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    handleDownloadRequest(e){
        let idx = parseInt(e.target.id.split('-')[1]);
        let tim = JSON.parse(sessionStorage.getItem("TIMTable"));
        let id = tim.rows[idx]['karma_id'];
        this.sendDownloadRequest(id)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    let blob = new Blob([response.data], {type: 'text/plain'});

                    let a = document.createElement("a");
                    a.style = "display: none";
                    document.body.appendChild(a);

                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'KL.txt';

                    a.click();

                    window.URL.revokeObjectURL(url);
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            })
            .catch(error => {
                window.alert(error.response.data["message"]);
            });
    };

    sendDownloadRequest1(id){
        const url = 'http://localhost:80/getTIM';
        const formData = new FormData();
        formData.append('kl_id',id);
        formData.append('class_num','KL-class-1.0.txt');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    handleDownloadRequest1(e){
        let idx = parseInt(e.target.id.split('-')[1]);
        let tim = JSON.parse(sessionStorage.getItem("TIMTable"));
        let id = tim.rows[idx]['karma_id'];
        this.sendDownloadRequest1(id)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    let blob = new Blob([response.data], {type: 'text/plain'});

                    let a = document.createElement("a");
                    a.style = "display: none";
                    document.body.appendChild(a);

                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'KL-class-1.0.txt';

                    a.click();

                    window.URL.revokeObjectURL(url);
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            })
            .catch(error => {
                window.alert(error.response.data["message"]);
            });
    };

    sendDownloadRequest0(id){
        const url = 'http://localhost:80/getTIM';
        const formData = new FormData();
        formData.append('kl_id',id);
        formData.append('class_num','KL-class-0.0.txt');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.post(url, formData,config);
    };

    handleDownloadRequest0(e){
        let idx = parseInt(e.target.id.split('-')[1]);
        let tim = JSON.parse(sessionStorage.getItem("TIMTable"));
        let id = tim.rows[idx]['karma_id'];
        this.sendDownloadRequest0(id)
            .then((response)=>{
                console.log(response.data);
                if(response.status < 400){
                    let blob = new Blob([response.data], {type: 'text/plain'});

                    let a = document.createElement("a");
                    a.style = "display: none";
                    document.body.appendChild(a);

                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'KL-class-0.0.txt';

                    a.click();

                    window.URL.revokeObjectURL(url);
                }
                else{
                    window.alert('uh oh, there\'s a problem!')
                }
            })
            .catch(error => {
                window.alert(error.response.data["message"]);
            });
    };

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
                'x-access-token': cookies.get('auth-token'),
                'content-type': 'multipart/form-data'
            }
        };
        return Axios.post(url, formData,config);
    };

    getDataOnDataset(id){
        const url = 'http://localhost:80/getDataOnDataset?id='+id;
        const config = {
            headers: {
                'x-access-token': cookies.get('auth-token')
            }
        };
        return Axios.get(url, config);
    }


    handleSubmit = (id,PAAWin,BinNo,IPGap,MoD,EpsilonInput, naxTirpLen ,MaxGapInput,MinVerticalSupportInput) => {
        let x= JSON.parse(sessionStorage.TIMTable);

        if (EpsilonInput) {
            let index_same;
            if (this.state.Class.get("0")=== undefined){
                index_same = "true"
            }
            else{
                index_same= this.state.Class.get("0")
            }
            let allen;
            if (this.state.Allen.get("0")=== undefined){
                allen = "3"
            }
            else{
                allen= this.state.Allen.get("0")
            }
            if (index_same === "3" || index_same === "true"){
                index_same = "true"
            }
            else{
                index_same = "false"
            }

            let discretizationID = id;
            let max_tirp_length = naxTirpLen.value;
            let epsilon = EpsilonInput.value;
            if (epsilon === ""){
                epsilon=0;
            }
            console.log(allen);
            console.log(index_same);
            this.sendTIM(epsilon,
                MaxGapInput.value,
                MinVerticalSupportInput.value,
                allen,
                discretizationID,
                max_tirp_length,
                index_same)
                .then((TIMResponse)=>{
                    console.log(TIMResponse.data);
                    if(TIMResponse.status < 400){
                        this.getDataOnDataset(sessionStorage.getItem("datasetName"))
                            .then((response) => {
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
                                    sessionStorage.setItem('currDisc', discretizationID);
                                    sessionStorage.setItem('currKL', TIMResponse.data['KL_id'])
                                    this.forceUpdate();
                                    window.alert("karmaLego Created!")
                                    //sessionStorage.setItem("allTables",JSON.stringify(myData));
                                    //console.log(JSON.parse(sessionStorage.allTables));
                                    //window.dispatchEvent(new Event("ReloadHomeTable"));
                                } else {
                                    window.alert('there is no such file to download');
                                }
                            });
                    }
                    else{
                        window.alert('uh oh, there\'s a problem!')
                    }
                })
                .catch(error => {
                    window.alert(error.response.data["message"]);
                });

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
        if (this.state.Class.get("0") === "3"){
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
                <td width={"8%"}>
                    PAA-Bins-Interpolation-Method
                </td>
                <td width={"5%"}>
                    Min. Vertical Support (%)
                </td>
                <td width={"5%"}>
                    Max Gap (Integer)
                </td>
                <td width={"5%"}>
                    No. of Allen Relations
                </td>
                <td width={"5%"}>
                    Epsilon (Integer)
                </td>
                <td width={"5%"}>
                    Max TIRP Length (Integer)
                </td>
                <td width={"5%"}>
                    Index Same
                </td>
                <td width={"5%"}>
                    Mine
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
                        {iter['PAAWindowSize']+"-"
                        +iter['BinsNumber']+"-"
                        +iter['InterpolationGap']+"-"
                        +iter['MethodOfDiscretization']}
                    </td>
                    <td>
                        <Form.Control id={MinVSInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={MaxGapInput} type={"text"}>
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
                        <Form.Control id={EpsilonInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={maxTirpLenInput} type={"text"}>
                        </Form.Control>
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
                        <Button className={"btn btn-hugobot"}
                                onClick={() => this.handleSubmit(
                                    iter.id,
                                    iter['PAAWindowSize'],
                                    iter['BinsNumber'],
                                    iter['InterpolationGap'],
                                    iter['MethodOfDiscretization'],
                                    document.getElementById(EpsilonInput),
                                    document.getElementById(maxTirpLenInput),
                                    document.getElementById(MaxGapInput),
                                    document.getElementById(MinVSInput))}>
                            <i className={"fas fa-play"}/>Mine
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
                    PAA-Bins-Interpolation-Method
                </td>
                <td>
                    Min. Vertical Support (%)
                </td>
                <td>
                    Max Gap (Integer)
                </td>
                <td>
                    No. of Allen Relations
                </td>
                <td>
                    Epsilon (Integer)
                </td>
                <td>
                    Max TIRP Length (Integer)
                </td>
                <td>
                    Index Same
                </td>
                <td>
                    Download class0
                </td>
                <td>
                    Download class1
                </td>
                <td>
                    Download Both
                </td>
            </tr>
            </thead>
        );
    };

    renderExistingRunsData = () => {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter, index) => {
            return (
                <tr key={index}>
                    <td width={"10%"}>
                        {iter['PAAWindowSize']+"-"
                        +iter['BinsNumber']+"-"
                        +iter.InterpolationGap+"-"
                        +iter['MethodOfDiscretization']}
                    </td>
                    <td width={"5%"}>
                        {iter['VerticalSupport']}
                    </td>
                    <td width={"5%"}>
                        {iter['MaxGap']}
                    </td>
                    <td width={"5%"}>
                        {iter['numRelations']}
                    </td>
                    <td width={"5%"}>
                        {iter['epsilon']}
                    </td>
                    <td width={"5%"}>
                        {iter['maxTirpLength']}
                    </td>
                    <td width={"5%"}>
                        {iter['indexSame']}
                    </td>
                    <td width={"12%"}>
                        {<Button className="bg-hugobot" id={"download0-"+index} onClick={this.handleDownloadRequest0}>
                            <i className="fas fa-download" id={"downloadIcon0-"+index}/> Download
                        </Button>}
                    </td>
                    <td width={"12%"}>
                        {<Button className="bg-hugobot" id={"download1-"+index} onClick={this.handleDownloadRequest1}>
                            <i className="fas fa-download" id={"downloadIcon1-"+index}/> Download
                        </Button>}
                    </td>
                    <td width={"12%"}>
                        {<Button className="bg-hugobot" id={"download2-"+index} onClick={this.handleDownloadRequest}>
                            <i className="fas fa-download" id={"downloadIcon2-"+index}/> Download
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