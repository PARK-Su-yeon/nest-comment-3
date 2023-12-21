import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/commentRequest.dto';
import { ReplyRequestDto } from './dto/replyRequest.dto';
import { Reply } from './entities/reply.entity';
import { Comment } from './entities/comment.entity';
import { LessThan, Repository, createQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    readonly commentRepository: Repository<Comment>,
    @InjectRepository(Reply)
    readonly replyRepository: Repository<Reply>,
){}

  createComment(createCommentDto: CreateCommentDto) {
    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = createCommentDto.user;
    comment.postId = createCommentDto.postId;
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
   
    
    return this.commentRepository.save(comment);
  }

  async createReply(replyRequestDto: ReplyRequestDto): Promise<Reply> {
    const reply = new Reply();
    reply.reply = replyRequestDto.reply;
    reply.user = replyRequestDto.user;
  
    try {
      const commentId: number = replyRequestDto.commentId; // Explicitly specify the type
      
      reply.comment = await this.commentRepository.findOne({
        where: {
          id: commentId,
        },
      });


  
  
      reply.postId = replyRequestDto.postId;
      reply.createdAt = new Date();
      reply.updatedAt = new Date();
  
      return this.replyRepository.save(reply);
    } catch (error) {
     
      throw new Error(`Failed to find comment: ${error.message}`);
    }
  }
  


  public findallcomments(postId: number, page: number, perPage: number){

    const skip = isNaN(page) || page < 1 ? 0 : (page - 1) * perPage;
    const take = isNaN(perPage) || perPage < 1 ? 2 : perPage;
    const comments = this.commentRepository.find({
      where: { postId, report: LessThan(10) },
      relations:{reply: true}, 
      order: { createdAt: 'DESC' }, 
      skip: skip,
     take: take,
    });


    return comments;
  }


  
  
  async deleteComment(CommentId: number) {
    const deleteComment = await this.commentRepository.find({
      where: {
        id: CommentId,
      },
    });

    return this.commentRepository.remove(deleteComment);
  }

  async deleteReply(ReplyId: number) {
    const deleteReply = await this.replyRepository.find({
      where: {
        id: ReplyId,
      },
    })

    return this.replyRepository.remove(deleteReply);
  }

//없는 commentid 일 경우 예외처리

  async likeComment(commentId: number): Promise<Comment> {
 

    const { like } = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
      select: ["like"],
    });

    await this.commentRepository.update(
      {
        id: commentId,
      },
      {
        like: like + 1,//기존 값에서 1더해준다
      }
    );

    const Comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });
    return Comment;
  }


  async likeReply(ReplyId: number): Promise<Reply> {
    // Increment the likes count

   const { like } = await this.replyRepository.findOne({
     where: {
       id: ReplyId,
     },
     select: ["like"],
   });
 
   await this.replyRepository.update(
     {
       id: ReplyId,
     },
    
     {
      like: like + 1,//기존 값에서 1더해준다
     }
   );

   const reply = await this.replyRepository.findOne({
    where: {
      id: ReplyId,
    },
  });
  return reply;

 }

 //좋아요 중복방지

 //ip session cookies, 
  async reportComment(CommentId: number) {
    const { report } = await this.commentRepository.findOne({
      where: {
        id: CommentId,
      },
      select: ["report"],
    });

    await this.commentRepository.update(
      {
        id: CommentId,
      },
      {
        report: report + 1,//기존 값에서 1더해준다
      }
    );

    const Comment = await this.commentRepository.findOne({
      where: {
        id: CommentId,
      },
    });
    return Comment;
  }
  
  async reportReply(ReplyId: number) {
    
    const { report } = await this.replyRepository.findOne({
      where: {
        id: ReplyId,
      },
      select: ["report"],
    });

    await this.commentRepository.update(
      {
        id: ReplyId,
      },
      {
        report: report + 1,//기존 값에서 1더해준다
      }
    );

    const reply = await this.replyRepository.findOne({
      where: {
        id: ReplyId,
      },
    });
    return reply;
  }
}
