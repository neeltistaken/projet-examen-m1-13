import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Post('/')
  @ApiOperation({ summary: 'Create a book' })
  @ApiAcceptedResponse({ type: BookPresenter })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiParam({ name: 'authorId', type: 'string' })
  public async create(@Query() query): Promise<BookPresenter> {
    const { title, authorId } = query;
    const book = await this.bookUseCases.create(title, authorId);

    return BookPresenter.from(book);
  }

  @Put('/:id/')
  @ApiOperation({ summary: 'Update a book' })
  @ApiAcceptedResponse({ type: BookPresenter })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiParam({ name: 'authorId', type: 'string' })
  public async update(
    @Param('id') id: BookId,
    @Query() query,
  ): Promise<BookPresenter> {
    const { title, authorId } = query;
    const book = await this.bookUseCases.update(id, title, authorId);

    return BookPresenter.from(book);
  }

  @Delete('/:id/')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiAcceptedResponse({ type: BookPresenter })
  @ApiParam({ name: 'id', type: 'string' })
  public async delete(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.delete(id);

    return BookPresenter.from(book);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Add a book genre' })
  @ApiAcceptedResponse({ type: BookPresenter })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'genreId', type: 'string' })
  public async addGenre(
    @Param('id') id: BookId,
    @Query() query,
  ): Promise<BookPresenter> {
    const { genreId } = query;
    const book = await this.bookUseCases.addGenre(id, genreId);

    return BookPresenter.from(book);
  }
}
