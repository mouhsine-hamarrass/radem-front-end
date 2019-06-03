import {ApplicantModel} from './applicant.model';

export class NewRefundRequestModel {
  id?: number;
  procuration?: boolean;
  procuratorCin?: string;
  procuratorLastname?: string;
  procuratorFirstname?: string;
  paymentMode?: string;
  applicant?: ApplicantModel = new ApplicantModel();
  contractNbrs?: Array<string>;
  attachmentIds?: Array<number>;
  tour?: string;
}
