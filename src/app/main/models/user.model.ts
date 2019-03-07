import {User as CustomUser} from '../../core/models/user.model';

export class User extends CustomUser {
  service?: string;
  address: string;
  admin?: boolean;
  requestsFollow: boolean;
  avatar: string;
  settings: any;
  enabled: boolean;
  phone: string;
  profile: any;
  profileType: string;
  authorities: any;
  createdDate: string;
  clientNo: string
}
