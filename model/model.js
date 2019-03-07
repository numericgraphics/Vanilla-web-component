import PubSub from "../libs/pubsub.js";
import IntegrationLayer from "./integrationLayer.js";
import SourceAsset from './SourceAssets.js'
import Parser from "./parser.js";

export default class Model extends PubSub {

    static RESOURCE_LIST_READY  = 'ResourceList_Ready';

    constructor(urn){
        super();
        console.log("Model constructor", urn);
        console.log("MIME_TYPES", SourceAsset.MIME_TYPES);
        this.subscribeToParser = this.subscribeToParser.bind(this);

        this.parser = new Parser();
        this.integrationLayer = new IntegrationLayer(urn);
        this.integrationLayer.subscribe(this.parser.subscribeToDataSource);
        this.parser.subscribe(this.subscribeToParser);
    }

    subscribeToParser(chapter){
        this.publish(Model.RESOURCE_LIST_READY, chapter.resourceList.map(item => item.url));
    }

    init(){
        console.log("Model init");
        this.initListeners();
    }

    initListeners() {

    }
}
