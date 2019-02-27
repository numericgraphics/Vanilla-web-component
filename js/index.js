import './colorType.js'
import './videoComponent.js'
import './controlBarComponent.js'
import './playerComponent.js'

const appDiv = document.getElementById('app');
const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
appDiv.innerHTML = `<player-component url=${url} id="videoPlayer"></player-component>`;

document.addEventListener("DOMContentLoaded",() => {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.registerSubscriptions();
});
