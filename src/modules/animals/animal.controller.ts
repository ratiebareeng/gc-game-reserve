import { Request, Response, NextFunction } from 'express';
import { AnimalService } from './animal.service';

export class AnimalController {
  private animalService: AnimalService;

  constructor() {
    this.animalService = new AnimalService();
  }

  /**
   * Get all animals with optional category filter
   */
  getAllAnimals = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { category } = req.query;
      const animals = await this.animalService.getAllAnimals(category as string);

      res.status(200).json({
        success: true,
        data: animals,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get featured animals
   */
  getFeaturedAnimals = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const animals = await this.animalService.getFeaturedAnimals();

      res.status(200).json({
        success: true,
        data: animals,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Search animals by name
   */
  searchAnimals = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Search query parameter "q" is required',
        });
        return;
      }

      const animals = await this.animalService.searchAnimals(q);

      res.status(200).json({
        success: true,
        data: animals,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get animal by ID
   */
  getAnimalById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const animal = await this.animalService.getAnimalById(Number(id));

      res.status(200).json({
        success: true,
        data: animal,
      });
    } catch (error) {
      next(error);
    }
  };
}
