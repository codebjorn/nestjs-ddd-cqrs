import { UserData } from 'src/infra/interface/userData.interface';

export class UpdateUserCommand {
  constructor(public readonly id: string, public readonly userData: UserData) {}
}
