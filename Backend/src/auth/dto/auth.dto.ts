import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export interface UserPayload {
  id: number;
  email: string;
  role: string;
  name?: string;
}