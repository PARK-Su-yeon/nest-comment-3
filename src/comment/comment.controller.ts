import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { CommentService } from './comment.service';

import { ReplyRequestDto } from './dto/replyRequest.dto';
import { CreateCommentDto } from './dto/commentRequest.dto';


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createCommnet(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Post('/reply')
  createReply(@Body() replyRequestDto: ReplyRequestDto) {
    return this.commentService.createReply(replyRequestDto);
  }

 //해당 아이디는 포스트의 아이디입니다.
  @Get(':id')
  findOne(
    @Param('id') id: number,
  @Query('page') page: number = 1,
  @Query('perPage') perPage: number = 2,
  ) {
    return this.commentService.findallcomments(id,page,perPage);
  }


  @Delete('/comments/:id')
  deleteCommnet(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }

  @Delete('replies/:id')
  deleteReply(@Param('id') id: number) {
    return this.commentService.deleteReply(id);
  }

  @Post('/comments/:id')
  LikeComment(@Param('id') id: number) {
    return this.commentService.likeComment(id);
  }

  @Post('/replies/:id')
  LikeReply(@Param('id') id: number) {
    return this.commentService.likeReply(id);
  }

  @Get('comments/:id')
  reportComment(@Param('id') id: number) {
    return this.commentService.reportComment(id);
  }

  @Get('/replies/:id')
  reportReply(@Param('id') id: number) {
    return this.commentService.reportReply(id);
  }
}
