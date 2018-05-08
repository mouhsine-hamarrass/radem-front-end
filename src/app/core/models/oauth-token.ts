import {User} from './user.model';

export class OauthToken {
   constructor(public accessToken: string,
               public tokenType: string,
               public refreshToken: string,
               public expiresIn: number,
               public scope: string,
               public user: User) {
   }
}
