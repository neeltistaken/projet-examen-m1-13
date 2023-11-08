import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { MissingParamError } from 'library-api/src/common/errors';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCasesOutput } from './genre.useCases.type';
import { GenrePresenter } from '../../controllers/genres/genre.presenter';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAllPlain(): Promise<GenreUseCasesOutput[]> {
    return this.genreRepository.getAllPlain();
  }

  /**
   * Create a genre
   * @param name Genre's name
   * @returns Created genre
   */
  public async create(name: string): Promise<GenreUseCasesOutput> {
    if (!name) {
      throw new MissingParamError('Missing genre name');
    }
    return this.genreRepository.createGenre(name);
  }

  /**
   * Delete a genre
   * @param id Genre's ID
   */
  public async delete(id: GenreId): Promise<GenrePresenter> {
    if (!id) {
      throw new MissingParamError('Missing genre ID');
    }
    return this.genreRepository.deleteGenre(id);
  }

  /**
   * Update a genre
   * @param id Genre's ID
   * @param name Genre's name
   */
  public async update(id: GenreId, name: string): Promise<GenrePresenter> {
    if (!id) {
      throw new MissingParamError('Missing genre ID');
    }
    if (!name) {
      throw new MissingParamError('Missing genre name');
    }
    // On vérifie que le genre existe
    await this.genreRepository.getById(id);
    return this.genreRepository.updateGenre(id, name);
  }
}
