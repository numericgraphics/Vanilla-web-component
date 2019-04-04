import React, { Component } from 'react';
import '../App.scss';

class AudioComponent extends Component {

    constructor(props){
        super(props);
        this.audio = React.createRef();
        console.log("AudioComponent constructor", this);
    }

    render() {
        return (
           <audio id="audio" ref={this.audio} />
        )
    }
}

export default AudioComponent;
