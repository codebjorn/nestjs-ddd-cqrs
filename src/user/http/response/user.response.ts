import { ResponseAbstract } from 'src/abstract/response.abstract';
import { User } from 'src/user/database/entity/user.entity';

export class UserResponse extends ResponseAbstract<User> {
  constructor(protected data: User | User[]) {
    super(data);
  }

  public static render(data: User | User[]): object {
    const self = new this(data);
    return self.transform();
  }

  protected transformOne(user: User): object {
    return {
      id: user.getId(),
      email: user.getEmail(),
      username: user.getUsername(),
      name: user.getName(),
      role: user.getRole(),
    };
  }

  protected transformMany(users: User[]): Array<object> {
    return users.map((user: User) => this.transformOne(user));
  }
}
