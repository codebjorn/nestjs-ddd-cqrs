import { UserData } from 'src/user/interface/userData.interface';

export class CreateUserCommand {
  constructor(public readonly userData: UserData) {}
}
