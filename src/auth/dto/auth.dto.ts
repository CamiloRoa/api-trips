import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the mail of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
