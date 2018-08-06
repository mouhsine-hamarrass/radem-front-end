import {User as CustomUser} from '../../core/models/user.model';

export class User extends CustomUser {
  accountType: string;
  profileType: string;
  address: string;
  admin: boolean;
  avatar: string;
  accounts: Array<string>;
  settings: any;
  enabled: boolean;
  phone: string;
  profile: any;
  authorities: any;
  createdDate: string;
}
