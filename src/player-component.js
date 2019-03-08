import React, { Component } from 'react';
import VideoComponent from './views/video-component.js'
import './App.css';
import {PlayerController} from "./controllers/playerController";
import {Model} from "./model/model";

class PlayerComponent extends Component {

    constructor(props){
        super(props);
        console.log("PlayerComponent constructor", props);
        this.model = new Model(props.urn);
        this.playerController = new PlayerController();
    }

    render() {
        return (
            <div className="container-video">
                <VideoComponent id="videoElement" src="" width="640" height="365"/>
            </div>
        );
    }

    componentDidMount() {
        console.log("PlayerComponent - componentDidMount");
    }

    componentWillUnmount() {
        console.log("PlayerComponent - componentWillUnmount");
    }

    componentDidUpdate(){
        console.log("PlayerComponent - componentDidUpdate");
    }
}

export default PlayerComponent;
