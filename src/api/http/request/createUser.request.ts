import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsEmpty()
  role?: number;
}
