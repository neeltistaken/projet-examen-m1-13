import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, type: PlainAuthorPresenter, isArray: true })
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an author by its ID' })
  @ApiResponse({ status: 200, type: PlainAuthorPresenter })
  @ApiResponse({ status: 404, description: 'Author not found' })
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return PlainAuthorPresenter.from(author);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create an author' })
  @ApiResponse({ status: 200, type: PlainAuthorPresenter })
  @ApiParam({ name: 'firstName', type: 'string' })
  @ApiParam({ name: 'lastName', type: 'string' })
  @ApiParam({ name: 'photoUrl', type: 'string' })
  public async create(
    @Query() query: { firstName: string; lastName: string; photoUrl: string },
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.create(
      query.firstName,
      query.lastName,
      query.photoUrl,
    );

    return PlainAuthorPresenter.from(author);
  }

  @Put('/:id/')
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: 200, type: PlainAuthorPresenter })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'firstName', type: 'string' })
  @ApiParam({ name: 'lastName', type: 'string' })
  @ApiParam({ name: 'photoUrl', type: 'string' })
  public async update(
    @Param('id') id: AuthorId,
    @Query() query: { firstName: string; lastName: string; photoUrl: string },
  ): Promise<PlainAuthorPresenter> {
    const { firstName, lastName, photoUrl } = query;

    return PlainAuthorPresenter.from(
      await this.authorUseCases.update(id, firstName, lastName, photoUrl),
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({ status: 200, type: PlainAuthorPresenter })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @ApiParam({ name: 'id', type: 'string' })
  public async delete(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    return PlainAuthorPresenter.from(await this.authorUseCases.delete(id));
  }
}
