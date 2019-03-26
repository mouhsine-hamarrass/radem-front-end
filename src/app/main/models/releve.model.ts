export class ReleveModel {
  id?: number;
  indexValue?: string;
  dateReading?: string;
  contractNo?: string;

  constructor(id: number, indexValue: string, dateReading: string, contractNo: string) {
    this.id = id;
    this.indexValue = indexValue;
    this.dateReading = dateReading;
    this.contractNo = contractNo;
  }
}
