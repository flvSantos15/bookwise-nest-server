import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'datetime' })
  created_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  updated_at: Date | null;

  constructor(props: {
    name: string;
    created_at?: Date | null;
    updated_at?: Date | null;
  }) {
    Object.assign(this, props);
  }
}
