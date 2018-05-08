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
