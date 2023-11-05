import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreId } from 'library-api/src/entities';
import { GenrePresenter } from './genre.presenter';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all genres' })
  @ApiAcceptedResponse({ type: GenrePresenter, isArray: true })
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(GenrePresenter.from);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a genre' })
  @ApiAcceptedResponse({ type: GenrePresenter })
  @ApiParam({ name: 'name', type: 'string' })
  public async create(@Query() query): Promise<GenrePresenter> {
    const { name } = query;
    const genre = await this.genreUseCases.create(name);

    return GenrePresenter.from(genre);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a genre by its ID' })
  @ApiParam({ name: 'id', type: 'string' })
  public async delete(@Param('id') id: GenreId): Promise<void> {
    await this.genreUseCases.delete(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a genre name by its ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'name', type: 'string' })
  public async update(@Param('id') id: GenreId, @Query() query): Promise<void> {
    const { name } = query;
    await this.genreUseCases.update(id, name);
  }
}
