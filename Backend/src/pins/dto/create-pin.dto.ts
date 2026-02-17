import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePinDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lng: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

export class UpdatePinDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() description?: string;
  @IsNumber() @IsOptional() lat?: number;
  @IsNumber() @IsOptional() lng?: number;
  @IsNumber() @IsOptional() categoryId?: number;
}