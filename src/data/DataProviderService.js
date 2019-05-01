import DataproviderService from "srgletterbox-web/app/dataProvider/services/DataProviderService";

export class DataProviderService extends DataproviderService{
    constructor(performanceNeed){
        super();
        this.isPerformanceNeed = performanceNeed;
    }

    getMediaCompositionByUrn(urn, onlyChapters = true){
      if (this.isPerformanceNeed) {
          window.performance.mark('mediaByUrn_start');
          super.getMediaCompositionByUrn(urn, onlyChapters = true)
      }
    }
}
