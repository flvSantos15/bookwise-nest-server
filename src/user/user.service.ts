import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    const userId = uuidv4();
    user.id = userId;
    user.created_at = new Date();
    user.updated_at = new Date();

    this.userRepo.save(user);

    const { id, name, avatar, created_at, updated_at } = user;

    return {
      id,
      name,
      avatar,
      created_at,
      updated_at,
    };
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOneOrFail({ where: { id } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      return { msg: 'User not found' };
    }

    user.updated_at = new Date();

    // avatar
    if (updateUserDto.avatar) {
      user.avatar = updateUserDto.avatar;
    }

    // name
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    // password
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    this.userRepo.save(user);

    const { id, avatar, name, created_at, updated_at } = user;

    return {
      id,
      avatar,
      name,
      created_at,
      updated_at,
    };
  }

  async remove(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      return { msg: 'User not found' };
    }

    this.userRepo.delete({ id });

    return { msg: `${user.name} successful deleted!` };
  }
}
