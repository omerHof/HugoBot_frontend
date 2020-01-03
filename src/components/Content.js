import React, { Component } from "react";
import MyHomeTable from "./tables/DisplayTableHome.js";
import PostData from "./tables/Sample-JSON.json";
import './layout/colors.css';

class Content extends Component{
    state = {
        HomeTable: []
    };

    MakeTable = (TableName) => {
        this.setState({
            HomeTable: JSON.parse(JSON.stringify(PostData))
        });
    };


    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { HomeTable: PostData };
    }

    render(){
        return (
            <div className={"container"}>
                <MyHomeTable
                    HomeTable={this.state.HomeTable}
                />
            </div>
        );
    }
}

export default Content;
