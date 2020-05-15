import React, { Component } from "react";

import Plotly from "plotly"

class Graphs extends Component {

    constructor(props) {
        super(props);

        this.getClassifiersGraphs = this.getClassifiersGraphs.bind(this);
    }

    getClassifiersGraphs = () => {
        const parentElement = document.getElementById("classifiersGraphs");
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.lastChild);
        }
        let select = document.getElementById("setClassifier");
        let result = [];
        let options = select && select.options;
        let opt;

        for (let i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://localhost:8089/graphs/getSpecificClassifierGraphs', false);
        let reqBody = {"Classifiers": result}
        xmlHttp.setRequestHeader("Classifiers", JSON.stringify(result));
        xmlHttp.send(reqBody);
        let jsonObj = JSON.parse(JSON.parse(xmlHttp.responseText));
        for (let key in jsonObj) {
            let elementKey = key.replace(" ", "_");
            let newPlot = document.createElement(elementKey);
            Plotly.newPlot(newPlot, JSON.parse(jsonObj[key]));
            parentElement.appendChild(newPlot);
        }
    }

    render(){
        return(
            <h2>hoy</h2>
        );
    }
}
export default Graphs;