import { text } from 'aws-sdk/clients/customerprofiles';
import { Action } from 'src/modules/actions/entities/action.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('replies')
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: text;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.replies)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Action, (action) => action.replies)
  @JoinColumn({ name: 'actionId' })
  action: Action;
}
