import React, { Component } from 'react';
import '../App.css';

class VideoComponent extends Component {

    constructor(props){
        super(props);
        this.video = React.createRef();
        console.log("VideoComponent constructor", this);
    }

    render() {
        return (
           <video id="video" ref={this.video} width={this.props.width} height={this.props.height} controls autoPlay/>
        )
    }
}

export default VideoComponent;
