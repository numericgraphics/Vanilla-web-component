import React from 'react';
import videojs from 'video.js'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import VideoJSComponent from "./videojs-components/videojs-component";
//urn:rts:video:6735513
//urn:rts:video:10255533
// drm --> urn:rts:video:3608517
ReactDOM.render(<VideoJSComponent urn="urn:rts:video:3608517" width="400px" height="400px" conf="none"/>, document.getElementById('root'));

serviceWorker.unregister();
