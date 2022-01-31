import { IsEmail, IsEmpty } from 'class-validator';

export class UpdateUserRequest {
  @IsEmail()
  email: string;

  username: string;

  name: string;

  password: string;

  @IsEmpty()
  role?: number;
}
