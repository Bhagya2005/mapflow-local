import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  feedbackType: string;
}