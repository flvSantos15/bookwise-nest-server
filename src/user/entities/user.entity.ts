import { Column, Entity, PrimaryColumn } from 'typeorm';
// import crypto from 'crypto';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({ nullable: true, type: 'datetime' })
  created_at: Date | null;

  @Column()
  pagesRead: number;

  @Column()
  reviewedBooks: number;

  @Column()
  authorsRead: number;

  @Column()
  mostReadCategory: number;
}
