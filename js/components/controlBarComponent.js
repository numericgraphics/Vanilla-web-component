import {mixinObservable} from '../lib/mixinObservable.js';
import Pubsub from "../lib/pubsub.js";

const getStyle = () => {
    return `
          .controls-bar {
             position: absolute;
            bottom: 5px;
            left: 0;
            right: 0;
            opacity: 1;
            background-color: #111;
            width: 640px;
            height: 62px;
            color: #fff;
            display: grid;
            
            grid-template-columns: 20px 40px 100px auto 0fr 20px;
            grid-template-rows: 2px 0fr 1fr 2px;
    
            justify-items: center;
            align-items: center;
            grid-row-gap: 5px;
            grid-column-gap: 5px;
      
            background: rgba(255,255,255,0);
            background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5)));
            background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
            background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
            background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000', GradientType=0 );
        }
    
        .btPlay{
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 3;
          grid-row-end: 4;
          background: red;
          color:pink;
        }
        
        .progressBar{
          grid-column-start: 2;
          grid-column-end: span 4;
          grid-row-start: 2;
          grid-row-end: 3;
          width: 100% !important;
        }
        
        
        .btSetting{
          grid-column-start: 5;
          grid-column-end: 6;
          grid-row-start: 3;
          grid-row-end: 4;
          justify-self: end;
          background: red;
          color:pink;
        }
        
        .volumeBar{
          grid-column-start: 3;
          grid-column-end: 4;
          grid-row-start: 3;
          grid-row-end: 4;
          justify-self: start;
          background: red;
          color:pink;
          width:100px
        }
        
        .timing{
          grid-column-start: 4;
          grid-column-end: 5;
          grid-row-start: 3;
          grid-row-end: 4;
          color:pink;
          font: 400 11px system-ui;
          margin: 0px;
        }
  `
};

class ControlBarComponent extends mixinObservable(HTMLElement) {

    constructor(){
        super();
    }


    connectedCallback () {
        this.shadow = this.attachShadow({mode: 'open'});
        this.currentTime = 145;
        this.render();
        this.videoElementSubscription = this.videoElementSubscription.bind(this);
        this.timeupdateSubscription = this.timeupdateSubscription.bind(this);

    }

    addStyle () {
        const styleTag = document.createElement('style');
        styleTag.textContent = getStyle();
        this.shadow.appendChild(styleTag)
    }

    getButtons () {
        this.playButton = this.shadow.getElementById("play-pause");
        this.playButton.addEventListener("click", () => {
            this.notify('play-pause');
        });
    }

    createTemplate () {
        const template = document.createElement('template');
        template.innerHTML = `
            <button type="button" id="play-pause" class="btPlay">Play</button>
            <input type="range" class="progressBar" value=${this.currentTime}>
            <input type="range" class="volumeBar" value="0">
            <p class="timing">${this.currentTime}</p>
            <button type="button" id="play-pause" class="btSetting">Setting</button>`;

        return template;
    }

    render () {
        const div = document.createElement('div');
        div.classList.add('controls-bar');
        div.appendChild(this.createTemplate().content.cloneNode(true));
        this.addStyle();

        this.shadow.appendChild(div);
        this.getButtons();

    }

    // videoElementSubscription = (event) => {
    //     switch (event) {
    //         case 'play':
    //             this.playButton.innerHTML = "Pause";
    //             break;
    //         case 'pause':
    //             this.playButton.innerHTML = "Play";
    //             break;
    //     }
    // };

    update (event){
        console.log("videElementTimeupdateSubscription", event);
        this.currentTime = event.currentTime;
        updatetemplate();
    }

    videoElementSubscription (event){
        switch (event) {
            case 'play':
                this.playButton.innerHTML = "Pause";
                break;
            case 'pause':
                this.playButton.innerHTML = "Play";
                break;
            case 'seeking':

                break;
        }
    }
}

customElements.define('control-bar-component', ControlBarComponent);

