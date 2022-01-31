import { User } from 'src/domain/aggregateRoot/user.aggregateRoot';
import { ResponseAbstract } from 'src/infra/abstract/response.abstract';

export class UserResponse extends ResponseAbstract<User> {
  constructor(protected data: User | User[]) {
    super(data);
  }

  public static render(data: User | User[]): Record<string, unknown> {
    const self = new this(data);
    return self.transform();
  }

  protected transformOne(user: User): Record<string, unknown> {
    return {
      id: user.getId(),
      email: user.getEmail(),
      username: user.getUsername(),
      name: user.getName(),
      role: user.getRole(),
    };
  }

  protected transformMany(users: User[]): Array<Record<string, unknown>> {
    return users.map((user: User) => this.transformOne(user));
  }
}
