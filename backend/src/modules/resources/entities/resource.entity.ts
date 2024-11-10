import { Post } from 'src/modules/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Post, (post) => post.resources)
  @JoinColumn({ name: 'userId' })
  post: Post;
}
