import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreId } from 'library-api/src/entities';
import { GenrePresenter } from './genre.presenter';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, type: GenrePresenter, isArray: true })
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(GenrePresenter.from);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a genre' })
  @ApiResponse({ status: 200, type: GenrePresenter })
  @ApiResponse({ status: 404, description: "Genre name isn't defined" })
  @ApiParam({ name: 'name', type: 'string' })
  public async create(@Query() query): Promise<GenrePresenter> {
    const { name } = query;
    const genre = await this.genreUseCases.create(name);

    return GenrePresenter.from(genre);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a genre by its ID' })
  @ApiResponse({ status: 200, type: GenrePresenter })
  @ApiResponse({ status: 404, description: "Genre id doesn't exist" })
  @ApiParam({ name: 'id', type: 'string' })
  public async delete(@Param('id') id: GenreId): Promise<GenrePresenter> {
    return this.genreUseCases.delete(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a genre name by its ID' })
  @ApiResponse({ status: 200, type: GenrePresenter })
  @ApiResponse({ status: 404, description: "Genre id doesn't exist" })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'name', type: 'string' })
  public async update(
    @Param('id') id: GenreId,
    @Query() query,
  ): Promise<GenrePresenter> {
    const { name } = query;
    return this.genreUseCases.update(id, name);
  }
}
