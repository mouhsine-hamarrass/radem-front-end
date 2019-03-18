import {User} from '../../core/models/user.model';

export class UserDetails extends User {

  constructor(id: number,
              username: string,
              password: string,
              firstname: string,
              lastname: string,
              email: string) {
    super(id,
      username,
      password,
      firstname,
      lastname,
      email
    );
  }
}

export enum UserProfile {
  ADMINISTRATION = 'admin',
  ADMINISTRATION_PRINCIPALE = 'Administrateur principal',
}

export enum UserAccountType {
  ADMINISTRATION = 'ADMINISTRATION',
  ADMINISTRATION_PRINCIPALE = 'ADMINISTRATION_PRINCIPALE'
}


export enum ProfileTypeEnum {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}


export enum RequestSubscriptionTypeEnum {
  NEW = 'NEW',
  MUTATION = 'MUTATION'
}

export enum ComplaintStatus {
  CREATED = 'CREATED',
  SUPPORTED = 'SUPPORTED',
  ANALYSIS = 'ANALYSIS',
  REQUEST_COMPLEMENT = 'REQUEST_COMPLEMENT',
  TRANSMISSION_OF_INFORMATION = 'TRANSMISSION_OF_INFORMATION',
  REPLY_PROVIDED = 'REPLY_PROVIDED',
  CLOSED = 'CLOSED'
}

export enum ComplaintType {
  QUALITY_OF_ALIMENTATION = 'QUALITY_OF_ALIMENTATION',
  INTERVENTION_NOT_CARRIED_OUT = 'INTERVENTION_NOT_CARRIED_OUT',
  METER_NOT_POSED = 'METER_NOT_POSED',
  CONNECTION = 'CONNECTION',
  WATER_LEAK = 'WATER_LEAK',
  INVOICE = 'INVOICE',
  CUT = 'CUT',
  OTHER = 'OTHER',
}

export enum SubscriptionType {
  NEW = 'NEW',
  MUTATION = 'MUTATION'
}

export enum SubscriptionRequestStatus {
  FILING_APPLICATION = 'FILING_APPLICATION',
  INTERVENTION = 'INTERVENTION',
  METER_POSES = 'METER_POSES',
  SUBSCRIPTION_INVOICE = 'SUBSCRIPTION_INVOICE',
  SUBSCRIBED = 'SUBSCRIBED'
}

export enum AlertNotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD'
}

export enum ApplicantType {
  CLIENT = 'CLIENT',
  PROCUATION = 'PROCUATION',
  LETTER = 'LETTER'
}


export enum TransStatusEnum {
  CREATED = 'CREATED',
  CMI_REJECTED = 'CMI_REJECTED',
  WATERP_REJECTED = 'WATERP_REJECTED',
  AEL_REJECTED = 'AEL_REJECTED',
  VALIDATED= 'VALIDATED',
  NOT_VALIDATED = 'NOT_VALIDATED',
  SUSPENDED = 'SUSPENDED'
}




export enum TerminationRequestStatus {
  CREATED = 'CREATED',
  RECEIVED = 'RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DEPOSITED_COUNTER = 'DEPOSITED_COUNTER',
  UNPAID_VERIFICATION = 'UNPAID_VERIFICATION',
  SETTLEMENT = 'SETTLEMENT',
  REFUND = 'REFUND',
  CLOSED = 'CLOSED'
}

export enum Statut {
}
