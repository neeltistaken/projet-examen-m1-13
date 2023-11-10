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
  ApiOperation,
  ApiParam,
  ApiNotFoundResponse,
  ApiTags,
  ApiResponse,
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
  @ApiResponse({ status: 200, type: PlainBookPresenter, isArray: true })
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a book by its ID' })
  @ApiResponse({ status: 200, type: BookPresenter })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({ status: 200, type: BookPresenter })
  @ApiParam({ name: 'title', type: 'string' })
  @ApiParam({ name: 'authorId', type: 'string' })
  public async create(@Query() query): Promise<BookPresenter> {
    const { title, authorId } = query;
    const book = await this.bookUseCases.create(title, authorId);

    return BookPresenter.from(book);
  }

  @Put('/:id/')
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({ status: 200, type: BookPresenter })
  @ApiResponse({ status: 404, description: "Book isn't found" })
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
  @ApiResponse({ status: 200, type: BookPresenter })
  @ApiResponse({ status: 404, description: "Book isn't found" })
  @ApiParam({ name: 'id', type: 'string' })
  public async delete(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.delete(id);

    return BookPresenter.from(book);
  }

  @Patch('/:id/genre')
  @ApiOperation({ summary: 'Add a book genre' })
  @ApiResponse({ status: 200, type: BookPresenter })
  @ApiResponse({ status: 404, description: "Genre or book isn't found" })
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

  @Delete('/:id/genre')
  @ApiOperation({ summary: 'Remove a book genre' })
  @ApiResponse({ status: 200, type: BookPresenter })
  @ApiResponse({ status: 404, description: "Genre or book isn't found" })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'genreId', type: 'string' })
  public async removeGenre(
    @Param('id') id: BookId,
    @Query() query,
  ): Promise<BookPresenter> {
    const { genreId } = query;
    const book = await this.bookUseCases.removeGenre(id, genreId);

    return BookPresenter.from(book);
  }
}
