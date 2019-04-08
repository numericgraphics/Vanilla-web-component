import videojs from '../../../node_modules/video.js/dist/video.js'
import {Chapter} from './chapter.js'
import './css/segments-browser.scss'
const Plugin = videojs.getPlugin('plugin');


export class SegmentsBrowserPlugin extends Plugin {

    constructor(player, options) {
        super(player, options);

        player.on('ready', () => {
            console.log("SegmentsBrowserPlugin", player.options_.dataProvider.mediaCompoposition.chapterList);
            this.chapterList = player.options_.dataProvider.mediaCompoposition.chapterList;
            this.chapters = [];
            this.createDomElement();
            this.createSegments();
        });
    }

    clickChapter(){
        console.log("clickChapter");
    }

    createSegments() {
        this.chapterList.forEach(chapter => {
            this.chapters.push(new Chapter(chapter));
        });

        this.segmentsListContainer.innerHTML = ` ${this.chapters.map(chapter => `
        <button onclick="this.clickChapter('${chapter}')">
             ${chapter.render()}
        </button>
        `).join('')}`;

    }

    createDomElement() {
        this.videoContainer = document.querySelector("#vjs_video_3");
        this.segmentsContainer = document.createElement("div");
        this.segmentsContainer.classList.add('srg-segment-container');
        this.segmentsContainer.innerHTML = `<div class="srg-arrow srg-arrow-next"></div>
            <div class="srg-arrow srg-arrow-prev"></div>`;

        this.segmentsListContainer = document.createElement("div");
        this.segmentsListContainer.classList.add('srg-segment-list');

        this.segmentsContainer.appendChild(this.segmentsListContainer);
        console.log("createDomElement videoContainer", this.videoContainer);
        console.log("createDomElement document", document);
        this.videoContainer.appendChild(this.segmentsContainer);
    }
}

videojs.registerPlugin('SegmentsBrowserPlugin', SegmentsBrowserPlugin);
