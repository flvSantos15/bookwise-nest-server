import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: 'datetime' })
  created_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  updated_at: Date | null;

  constructor(props: {
    name: string;
    password: string;
    avatar: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
  }) {
    Object.assign(this, props);
  }
}
