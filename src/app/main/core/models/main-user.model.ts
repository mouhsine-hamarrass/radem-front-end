import {User as CustomUser} from '../../../core/models/user.model';

export class User extends CustomUser {
   address: string;
   admin: boolean;
   avatar: string;
   enabled: boolean;
   phone: string;
   profile: any;
   createdDate: string;
}
