import {PubSub} from "../libs/pubsub.js";
import {IntegrationLayer} from "./integrationLayer.js";
import {Parser} from "./parser.js";
import {Events} from "./events";

export class Model extends PubSub {

    constructor(urn){
        super();
        this.subscribeToParser = this.subscribeToParser.bind(this);

        this.parser = new Parser();
        this.integrationLayer = new IntegrationLayer(urn);
        this.integrationLayer.subscribe(this.parser.subscribeToDataSource);
        this.parser.subscribe(this.subscribeToParser);
    }

    subscribeToParser(chapter){
        this.publish(Events.RESOURCE_LIST_READY, chapter.resourceList.map(item => item.url));
    }
}
