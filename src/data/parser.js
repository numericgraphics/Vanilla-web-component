import {Observable} from "../libs/observable.js";

export class Parser extends Observable {

    constructor(){
        super();
        this.subscribeToDataSource = this.subscribeToDataSource.bind(this);
    }

    subscribeToDataSource(datas){
        let  metadata = datas;
        let chapter = metadata.chapterList.find( chapter => chapter.urn === metadata.chapterUrn);
        this.notify(chapter);
    }
}
