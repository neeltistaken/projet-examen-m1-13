import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiOperation,
  ApiParam,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all books' })
  @ApiAcceptedResponse({ type: PlainBookPresenter, isArray: true })
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a book by its ID' })
  @ApiAcceptedResponse({ type: BookPresenter })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }
}
