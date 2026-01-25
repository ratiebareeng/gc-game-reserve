import { AppDataSource } from '../../config/database';
import { Animal } from '../../database/entities/animal.entity';
import { AppError } from '../../utils/errors';
import { ILike } from 'typeorm';

export class AnimalService {
  private animalRepository = AppDataSource.getRepository(Animal);

  /**
   * Get all animals with optional category filter
   */
  async getAllAnimals(category?: string): Promise<Animal[]> {
    const whereCondition: any = {};

    if (category) {
      whereCondition.category = category;
    }

    return await this.animalRepository.find({
      where: whereCondition,
      relations: ['media'],
      order: { display_order: 'ASC', common_name: 'ASC' },
    });
  }

  /**
   * Get featured animals
   */
  async getFeaturedAnimals(): Promise<Animal[]> {
    return await this.animalRepository.find({
      where: { is_featured: true },
      relations: ['media'],
      order: { display_order: 'ASC' },
    });
  }

  /**
   * Search animals by name (common or scientific)
   */
  async searchAnimals(query: string): Promise<Animal[]> {
    return await this.animalRepository.find({
      where: [
        { common_name: ILike(`%${query}%`) },
        { scientific_name: ILike(`%${query}%`) },
      ],
      relations: ['media'],
      order: { common_name: 'ASC' },
    });
  }

  /**
   * Get animal by ID
   */
  async getAnimalById(id: number): Promise<Animal> {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['media'],
    });

    if (!animal) {
      throw new AppError('Animal not found', 404);
    }

    return animal;
  }
}
