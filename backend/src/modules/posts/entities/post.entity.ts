import { Action } from 'src/modules/actions/entities/action.entity';
import { Resource } from 'src/modules/resources/entities/resource.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Action, (action) => action.post)
  actions: Action[];

  @OneToMany(() => Resource, (resource) => resource.post)
  resources: Resource[];
}
