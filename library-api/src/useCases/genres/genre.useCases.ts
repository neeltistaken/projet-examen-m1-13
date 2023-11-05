import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { MissingParamError } from 'library-api/src/common/errors';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCasesOutput } from './genre.useCases.type';

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
    return this.genreRepository.createGenre(name);
  }

  /**
   * Delete a genre
   * @param id Genre's ID
   */
  public async delete(id: GenreId): Promise<void> {
    if (!id) {
      throw new MissingParamError('Missing genre ID');
    }
    await this.genreRepository.deleteGenre(id);
  }

  /**
   * Update a genre
   * @param id Genre's ID
   * @param name Genre's name
   */
  public async update(id: GenreId, name: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('Missing genre ID');
    }
    if (!name) {
      throw new MissingParamError('Missing genre name');
    }
    await this.genreRepository.updateGenre(id, name);
  }
}
