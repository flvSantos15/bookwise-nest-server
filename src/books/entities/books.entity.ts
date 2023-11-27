import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Books {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  pages: number;

  @Column({ nullable: true, type: 'datetime' })
  created_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  updated_at: Date | null;

  @OneToMany(() => Category, (category) => category.id)
  categories: Category[];

  constructor(props: {
    name: string;
    author: string;
    picture: string;
    pages: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    categoryIds?: number[] | undefined;
  }) {
    Object.assign(this, props);
  }
}
