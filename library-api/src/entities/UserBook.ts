/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  //   ManyToOne,
  //   OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// export type UserId = string & { __brand: 'User' };

@Entity('UserBooks')
export class UserBook extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  bookId: string;
}
