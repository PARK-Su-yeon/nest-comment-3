import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    content: string;
    
    @IsString()
    user: string;
    @IsNumber()
    postId: number;
}
