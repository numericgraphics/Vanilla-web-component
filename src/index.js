import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import VideoJSComponent from "./videojs-components/videojs-component";

ReactDOM.render(<VideoJSComponent urn="urn:rts:video:10255533" width="400px" height="400px" conf="none"/>, document.getElementById('root'));

serviceWorker.unregister();
