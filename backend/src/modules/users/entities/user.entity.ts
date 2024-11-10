import { Action } from 'src/modules/actions/entities/action.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Reply } from 'src/modules/replies/entities/reply.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  bio: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Action, (action) => action.user)
  actions: Action[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @Column({ type: 'varchar', length: 512, nullable: true })
  refreshToken: string;
}
