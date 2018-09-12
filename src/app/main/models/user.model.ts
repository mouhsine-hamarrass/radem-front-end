import {User as CustomUser} from '../../core/models/user.model';

export class User extends CustomUser {
  service?: string;
  address: string;
  admin: boolean;
  avatar: string;
  settings: any;
  enabled: boolean;
  phone: string;
  profile: any;
  authorities: any;
  createdDate: string;
}
