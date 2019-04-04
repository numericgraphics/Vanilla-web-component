import React, { Component } from 'react';

export class PlayerBase extends Component {

    constructor(props){
        super(props);
    }

    get player() {
           return this.basePlayer;
    }

    set player(ref){
        this.basePlayer = ref;
    }

    get currentTime () {
        return this.basePlayer.currentTime();
    }

    set source(source){
        this.basePlayer.src(source);
    }
}
