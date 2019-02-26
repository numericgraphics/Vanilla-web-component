// Import stylesheets
// import '../css/style.css';
// import stylesheet from '../css/style.css';

import './colorType.js'
import './videoComponent.js'
import './controlBarComponent.js'
import './playerComponent.js'

const appDiv = document.getElementById('app');
const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
appDiv.innerHTML = `<player-component url=${url} id="videoPlayer"></player-component>`;

window.onload = function() {
    console.log("window loaded");
    this.videoPlayer = document.getElementById('videoPlayer');
    this.videoPlayer.registerSubscriptions();
};
