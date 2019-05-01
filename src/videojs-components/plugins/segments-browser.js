import videojs from '../../../node_modules/video.js/dist/video.js'
import {Chapter} from './chapter.js'
import './css/segments-browser.scss'
const Plugin = videojs.getPlugin('plugin');


export class SegmentsBrowserPlugin extends Plugin {

    constructor(player, options) {
        super(player, options);
        this.createSegments = this.createSegments.bind(this);
        player.on('ready', () => {
            this.chapterList = player.options_.SRGProviders.mediaCompoposition.chapterList;
            this.chapters = [];
            this.createDomElement();

            this.createSegments();
        });
    }

    test = (data) => {
        console.log(data);
    };

    createSegments() {
        window.clickChapter = (chapter) => {
            console.log("clickChapter", chapter );
        };

        this.chapterList.forEach(chapter => {
            this.chapters.push(new Chapter(chapter));
        });

        this.segmentsListContainer.innerHTML = ` ${this.chapters.map(chapter => `
        <button onclick="clickChapter('${chapter.urn}')">
             ${chapter.render()}
        </button>
        `).join('')}`;

        // this.segmentsListContainer.innerHTML = ` ${this.chapters.map(chapter => `
        // <button onclick="this.test('${chapter.urn}')">
        //      ${chapter.render()}
        // </button>
        // `).join('')}`;
    }

    createDomElement() {
        this.videoContainer = document.querySelector(".vjs-control-bar");
        this.segmentsContainer = document.createElement("div");
        this.segmentsContainer.classList.add('srg-segment-container');
        this.segmentsContainer.innerHTML = `<div class="srg-arrow srg-arrow-next"></div>
                                            <div class="srg-arrow srg-arrow-prev"></div>`;

        this.segmentsListContainer = document.createElement("div");
        this.segmentsListContainer.classList.add('srg-segment-list');

        this.segmentsContainer.appendChild(this.segmentsListContainer);
        this.videoContainer.appendChild(this.segmentsContainer);
    }
}

videojs.registerPlugin('SegmentsBrowserPlugin', SegmentsBrowserPlugin);
