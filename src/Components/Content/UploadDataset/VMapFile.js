import React, { Component } from "react";
import {Button, ButtonGroup, Card, Form, Table} from "react-bootstrap";

class VMapFile extends Component{

    constructor(props) {
        super(props);
        this.state ={
            map: new Map()
        }
        this.recolorCell = this.recolorCell.bind(this);
    }

    UNFILLED_COLOR = 'FF8080';
    DUPLICATE_COLOR = 'FFEB99';
    OK_COLOR = '77db60';

    VMapList = ["44","55","1","5","39","40","41","42","43","2","3","4","6","-1"];

    recolorCell(e){
        let element = document.getElementById(e.target.id+"_td");
        let flag = false;
        let map = this.state.map;

        if(e.target.value === ""){
            element.setAttribute('bgcolor',this.UNFILLED_COLOR);
            map.delete(e.target.id+"_td");
        }
        else{
            for(let key of this.state.map.keys()){
                // window.alert(key + " : " + this.state.map.get(key));
                if(map.get(key).localeCompare(e.target.value) === 0){
                    flag = true;
                    document.getElementById(key).setAttribute('bgcolor',this.DUPLICATE_COLOR);
                }
            }
            if(flag){
                element.setAttribute('bgcolor',this.DUPLICATE_COLOR);
            }
            else{
                element.setAttribute('bgcolor',this.OK_COLOR);
            }
        }
        map.set(e.target.id+"_td",e.target.value);
        // window.alert(this.state.map.size);
    };

    renderTableHeader = () => {
        return(
            <tr>
                <td>
                    Variable ID
                </td>
                <td>
                    Variable Name
                </td>
                <td>
                    Variable Description
                </td>
            </tr>
        );
    };

    renderTableRow = (placeholder, idx) => {
        return (
            <tr>
                <td>
                    <Form.Control id={"id"+idx} placeholder={placeholder}/>
                </td>
                <td bgcolor={this.UNFILLED_COLOR} id={"name"+idx+"_td"}>
                    <Form.Control id={"name"+idx} onChange={this.recolorCell}/>
                </td>
                <td>
                    <Form.Control id={"description"+idx}/>
                </td>
            </tr>
        );
    };

    renderTable = () => {
        return this.VMapList.map((iter,idx) =>
            this.renderTableRow(iter, idx)
        )
    }

    render() {
        return (
            <Card>
                <Card.Header className={"bg-hugobot"}>
                    <Card.Text className={"text-hugobot"}>
                        Dataset
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <ButtonGroup>
                        <Button className="btn-hugobot" type={"button"}>
                            <i className="fas fa-edit"/>&nbsp;
                            Create new Variable Map
                        </Button>
                        <Button className="btn-hugobot" type={"button"}>
                            <i className="fas fa-upload"/>&nbsp;
                            Upload Variable Map
                        </Button>
                        <Button className="btn-hugobot" type={"button"}>
                            <i className="fas fa-check-square"/>&nbsp;
                            Proceed to Step 3
                        </Button>
                    </ButtonGroup>
                    <br/>
                    <br/>
                    <br/>
                    <Table>
                        {this.renderTableHeader()}
                        <br/>
                        {this.renderTable()}
                    </Table>
                    <br/>
                    <br/>
                    <br/>
                    <Button className={"btn-hugobot"}>
                        Proceed to Step 3
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}
export default VMapFile;