import { UserData } from 'src/infra/interface/userData.interface';

export class CreateUserCommand {
  constructor(public readonly userData: UserData) {}
}
