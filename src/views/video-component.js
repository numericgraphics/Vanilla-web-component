import React, { Component } from 'react';
import '../App.scss';

class VideoComponent extends Component {

    constructor(props){
        super(props);
        this.video = React.createRef();
    }

    render() {
        return (
           <video id="video" ref={this.video} width={this.props.width} height={this.props.height} controls autoPlay/>
        )
    }
}

export default VideoComponent;
