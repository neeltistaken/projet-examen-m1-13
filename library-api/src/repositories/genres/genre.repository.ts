import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Genre, GenreId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { GenrePresenter } from '../../controllers/genres/genre.presenter';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAllPlain(): Promise<Genre[]> {
    return this.find();
  }

  /**
   * Get a genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */
  public async getById(id: GenreId): Promise<Genre> {
    const genre = await this.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundError(`Genre - '${id}'`);
    }

    return genre;
  }

  /**
   * Create a genre
   * @param name Genre's name
   * @returns Created genre
   */
  public async createGenre(name: string): Promise<Genre> {
    const genre = new Genre();
    genre.name = name;

    return this.save(genre);
  }

  /**
   * Delete a genre
   * @param id Genre's id
   * @returns Deleted genre
   */
  public async deleteGenre(id: GenreId): Promise<GenrePresenter> {
    const genre = await this.findOne({ where: { id } });
    await this.delete(id);

    return genre;
  }

  /**
   * Update a genre
   * @param id Genre's id
   * @param name Genre's name
   * @returns Updated genre
   */
  public async updateGenre(id: GenreId, name: string): Promise<GenrePresenter> {
    const genre = await this.findOne({ where: { id } });
    genre.name = name;
    await this.save(genre);
    return this.getById(id);
  }
}
