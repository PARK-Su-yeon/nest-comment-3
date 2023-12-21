import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class ReplyRequestDto {
  
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    reply: string;
    
    @IsString()
    user: string;

    @IsNumber()
  postId: number;

  @IsNumber()
  commentId: number;
}
