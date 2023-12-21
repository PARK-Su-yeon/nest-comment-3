import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId:number;

    @Column()
    reply: string;

    @Column()
    user: string;

   // @Column({ name: 'commentId'})
   // commentId:number;

    @ManyToOne(type => Comment, comment => comment.reply, {
        onDelete: 'CASCADE',
    })
  @JoinColumn({ name: 'commentId' })
    comment: Comment;

    @Column({ default: 0 })
    like :number;
//신고
    @Column({ default: 0 })
    report : number;


    // @Column()
    // isDeleted: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
  
 



}
