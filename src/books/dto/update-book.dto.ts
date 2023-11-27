export class UpdateBookDto {
  name: string;
  author: string;
  picture: string | null;
  pages: number;
  updated_at: Date | null;
  categoryIds: number[] | null;
}
