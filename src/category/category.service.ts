import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(createCategoryDto);
    const categoryId = uuidv4();
    category.id = categoryId;
    category.created_at = new Date();
    category.updated_at = new Date();

    this.categoryRepo.save(category);

    const { id, name, created_at, updated_at } = category;

    return {
      id,
      name,
      created_at,
      updated_at,
    };
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: string) {
    return this.categoryRepo.findOneOrFail({ where: { id } });
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return { msg: 'Category not found' };
    }

    category.updated_at = new Date();

    // name
    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }

    this.categoryRepo.save(category);

    const { id, name, created_at, updated_at } = category;

    return {
      id,
      name,
      created_at,
      updated_at,
    };
  }

  async remove(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      return { msg: 'Category not found' };
    }

    this.categoryRepo.delete({ id });

    return { msg: `${category.name} successful deleted!` };
  }
}
