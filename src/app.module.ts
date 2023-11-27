import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { BookModule } from './books/books.module';
import { Books } from './books/entities/books.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Category, Books],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
