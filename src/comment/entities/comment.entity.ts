import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "./reply.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    content: string;
    
    @Column()
    user: string;

    @Column()
    postId: number;

    @OneToMany(() => Reply, (reply) => reply.comment,{
      cascade: true,
  })
    reply: Reply[];
    

    // @Column({ default: false })
    // isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;
  //좋아요
    @Column({ default: 0 })
    like :number;
    
//신고
    @Column({ default: 0 })
    report : number;
    @Column()
  updatedAt: Date;




}