export class CommonUtilService {
  static prepareDateMatchForPopulateOperation(
    fieldName: string, 
    dateFrom: string, 
    dateTo: string
  ): Object {
    if (!dateFrom && !dateTo) {
      return {};
    }
    
    const criteria: any = {};

    if (dateFrom) {
      criteria.$gt = dateFrom;
    }

    if (dateTo) {
      criteria.$lt = dateTo;
    }

    return {[fieldName]: criteria};
  }
}