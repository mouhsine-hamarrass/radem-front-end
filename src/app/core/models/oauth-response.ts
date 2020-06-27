import {Response} from './response.model';
import {OauthToken} from './oauth-token';

export class OauthResponse extends Response<OauthToken> {
   constructor() {
      super();
   }
}