import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class ControlBarComponent extends PolymerElement {
    constructor(){
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.currentTime = 123;
    }

    static get template() {
        return html`
      <!--<style>-->
        <!--.controls-bar {-->
             <!--position: absolute;-->
            <!--bottom: 0px;-->
            <!--left: 0;-->
            <!--right: 0;-->
            <!--opacity: 1;-->
            <!--background-color: #111;-->
            <!--width: 640px;-->
            <!--height: 62px;-->
            <!--color: #fff;-->
            <!--display: grid;-->
            <!---->
            <!--grid-template-columns: 20px 40px 100px auto 0fr 20px;-->
            <!--grid-template-rows: 2px 0fr 1fr 2px;-->
    <!---->
            <!--justify-items: center;-->
            <!--align-items: center;-->
            <!--grid-row-gap: 5px;-->
            <!--grid-column-gap: 5px;-->
      <!---->
            <!--background: rgba(255,255,255,0);-->
            <!--background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);-->
            <!--background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5)));-->
            <!--background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);-->
            <!--background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);-->
            <!--background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);-->
            <!--background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);-->
            <!--filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000', GradientType=0 );-->
        <!--}-->
    <!---->
        <!--.btPlay{-->
          <!--grid-column-start: 2;-->
          <!--grid-column-end: 3;-->
          <!--grid-row-start: 3;-->
          <!--grid-row-end: 4;-->
          <!--background: red;-->
          <!--color:pink;-->
        <!--}-->
        <!---->
        <!--.progressBar{-->
          <!--grid-column-start: 2;-->
          <!--grid-column-end: span 4;-->
          <!--grid-row-start: 2;-->
          <!--grid-row-end: 3;-->
          <!--width: 100% !important;-->
        <!--}-->
        <!---->
        <!---->
        <!--.btSetting{-->
          <!--grid-column-start: 5;-->
          <!--grid-column-end: 6;-->
          <!--grid-row-start: 3;-->
          <!--grid-row-end: 4;-->
          <!--justify-self: end;-->
          <!--background: red;-->
          <!--color:pink;-->
        <!--}-->
        <!---->
        <!--.volumeBar{-->
          <!--grid-column-start: 3;-->
          <!--grid-column-end: 4;-->
          <!--grid-row-start: 3;-->
          <!--grid-row-end: 4;-->
          <!--justify-self: start;-->
          <!--background: red;-->
          <!--color:pink;-->
          <!--width:100px-->
        <!--}-->
        <!---->
        <!--.timing{-->
          <!--grid-column-start: 4;-->
          <!--grid-column-end: 5;-->
          <!--grid-row-start: 3;-->
          <!--grid-row-end: 4;-->
          <!--color:pink;-->
          <!--font: 400 11px system-ui;-->
          <!--margin: 0px;-->
        <!--}-->
      <!--</style>-->
      <style>            
      .vjs-control-bar{
            position: absolute;
            bottom: 0px;
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
            .vjs-play-control{
                grid-column-start: 2;
                grid-column-end: 3;
                grid-row-start: 3;
                grid-row-end: 4;
            }
            .vjs-volume-panel{
                grid-column-start: 3;
                grid-column-end: 4;
                grid-row-start: 3;
                grid-row-end: 4;
                justify-self: start;
            }
            .vjs-progress-control{
                grid-column-start: 2;
                grid-column-end: span 4;
                grid-row-start: 2;
                grid-row-end: 3;
                width: 100% !important;
            }</style>
      <div class="controls-bar">
        <button type="button" id="play-pause" class="btPlay">Play</button>
        <input type="range" class="progressBar" value=[[currentTime]]>
        <input type="range" class="volumeBar" value="0">
        <p class="timing">[[currentTime]]</p>
        <button type="button" id="play-pause" class="btSetting">Setting</button>
        
</div>
        
        
        
        
        
        
        
        
        
        
      </div>
    `;
    }
    get properties() {
        return {
            currentTime: {
                type: Number,
                value: '',
            }
        };
    }
}

window.customElements.define('control-bar-component', ControlBarComponent);
