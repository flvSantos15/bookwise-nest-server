import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Books } from './entities/books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly bookRepo: Repository<Books>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = new Books(createBookDto);
    const bookId = uuidv4();
    book.id = bookId;
    book.created_at = new Date();
    book.updated_at = new Date();

    this.bookRepo.save(book);

    const { id, name, author, pages, picture, created_at, updated_at } = book;

    return {
      id,
      name,
      author,
      pages,
      picture,
      created_at,
      updated_at,
    };
  }

  findAll() {
    return this.bookRepo.find();
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findOne({ where: { id } });

    if (!book) {
      throw new Error('Book not found!');
    }

    return {
      id,
      name: book.name,
      author: book.author,
      picture: book.picture,
      pages: book.pages,
      created_at: book.created_at,
      updated_at: book.updated_at,
    };

    // return this.bookRepo.findOneOrFail({ where: { id } });
  }

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepo.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return { msg: 'Book not found' };
    }

    if (updateBookDto.name) {
      book.name = updateBookDto.name;
    }

    if (updateBookDto.author) {
      book.author = updateBookDto.author;
    }

    if (updateBookDto.picture) {
      book.picture = updateBookDto.picture;
    }

    if (updateBookDto.pages) {
      book.pages = updateBookDto.pages;
    }

    book.updated_at = new Date();

    this.bookRepo.save(book);

    const { id, name, author, pages, picture, created_at, updated_at } = book;

    return {
      id,
      name,
      author,
      pages,
      picture,
      created_at,
      updated_at,
    };
  }

  async remove(id: string) {
    const book = await this.bookRepo.findOne({ where: { id } });

    if (!book) {
      return { msg: 'Book not found' };
    }

    this.bookRepo.delete({ id });

    return { msg: `${book.name} successful deleted!` };
  }
}
