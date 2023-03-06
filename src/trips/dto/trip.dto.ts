import { IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'latitud of user' })
  readonly latitud: number;

  @IsNumber()
  @IsNotEmpty()
  readonly longitud: number;
}

export class UpdateTripDto extends PartialType(CreateTripDto) {}
