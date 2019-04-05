// jest.mock('../../node_modules/srgletterbox-web/app/dataProvider/services/DataProviderService.js');
// jest.mock('../../node_modules/srgletterbox-web/app/dataProvider/dataClass/MediaComposition.js');
import DataproviderService from './__mocks__/DataProviderService.js'
import {IntegrationLayer} from "./integrationLayer.js";

describe('is IntegrationLayer service is available', () => {
    // beforeAll(() => {
    //     DataproviderService.mockImplementation(() => {
    //         return {
    //             getMediaCompositionByUrn: (urn) => {
    //                 console.log('getMediaCompositionByUrn');
    //                 return {};
    //             },
    //         };
    //     });
    // });

    it('Should show this.integrationLayer is defined', () => {
        this.integrationLayer = new IntegrationLayer();
        expect(this.integrationLayer).not.toBeUndefined();
    });
});
