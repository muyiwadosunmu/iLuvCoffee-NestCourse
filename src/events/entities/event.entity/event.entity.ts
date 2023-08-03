import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/* @Index(['names','type']) */ //Used in more advanced cases to define composite index thay contain multiple columns
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
