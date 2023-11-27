export class CreateBookDto {
  name: string;
  author: string;
  picture: string | null;
  pages: number;
  created_at: Date | null;
  updated_at: Date | null;
  categoryIds: number[] | null;
}
