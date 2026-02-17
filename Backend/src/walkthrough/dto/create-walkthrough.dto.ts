import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWalkthroughDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;
}