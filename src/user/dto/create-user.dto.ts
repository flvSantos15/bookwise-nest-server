export class CreateUserDto {
  name: string;
  avatar: string | null;
  password: string;
  created_at: Date | null;
  updated_at: Date | null;
}
