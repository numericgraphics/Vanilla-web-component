import React, { Component } from 'react';
import AudioComponent from "./views/audio-component";
import {PlayerController} from "./controllers/playerController";
import {Model} from "./model/model";
import VideoJSComponent from "./views/videojs-component";


class PlayerComponent extends Component {

    constructor(props){
        super(props);
        this.type = this.props.type;
        this.model = new Model(props.urn);
        this.videoElement = React.createRef();
    }

    render() {
        const isVideo = this.type === 'video';
        let component;
        if (isVideo) {
            component =  <VideoJSComponent id="videoElement" ref={this.videoElement} src="" width="640" height="365"/>
        } else {
            component =  <AudioComponent />
        }
        return (
            <div className="container-video">
                {component}
            </div>
        );
    }

    componentDidMount() {
        this.playerController = new PlayerController(this.model, this.videoElement);
    }

    componentWillUnmount() {
        console.log("PlayerComponent - componentWillUnmount");
    }

    componentDidUpdate(){
        console.log("PlayerComponent - componentDidUpdate");
    }
}

export default PlayerComponent;
