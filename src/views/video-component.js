import React, { Component } from 'react';
import '../App.css';

class VideoComponent extends Component {

    constructor(props){
        super(props);
        console.log("VideoComponent constructor", props);
    }

    render() {
        return (
           <video id="video" width={this.props.width} height={this.props.height} controls autoPlay/>
        )
    }
}

export default VideoComponent;
