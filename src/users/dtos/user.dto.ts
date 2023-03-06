import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  Length,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the mail of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly rol: string;

  @IsNotEmpty()
  @IsNumber()
  readonly lat: number;

  @IsNotEmpty()
  @IsNumber()
  readonly lon: number;

  @IsNumber()
  @IsOptional()
  readonly payment_source_id: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
