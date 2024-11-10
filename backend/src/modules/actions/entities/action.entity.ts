import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { ActionType } from '../../../constants/action.enum';
import { Reply } from 'src/modules/replies/entities/reply.entity';

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.actions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: ActionType,
    default: null,
  })
  type: ActionType;

  @ManyToOne(() => Post, (post) => post.actions)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @OneToMany(() => Reply, (reply) => reply.action)
  replies: Reply[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
