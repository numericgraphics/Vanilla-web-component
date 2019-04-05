
export class DataProviderService {
    constructor() {
        console.log("DataproviderService constructor");
    }

    getMediaCompositionByUrn(urn) {
        console.log("getMediaCompositionByUrn mock");
        return "toto";
        // return fetch(url).then((response) => {
        //     // if (!response.ok) { throw response }
        //     //
        //     // return response.json().then((data) => {
        //     //     return Object.assign(new MediaComposition(), data);
        //     // });
        // });
    }
}
