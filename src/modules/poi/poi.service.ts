import { AppDataSource } from '../../config/database';
import { PointOfInterest } from '../../database/entities/poi.entity';
import { POIType } from '../../config/constants';
import { AppError } from '../../utils/errors';

export class POIService {
  private poiRepository = AppDataSource.getRepository(PointOfInterest);

  async getAllPOIs(type?: string): Promise<PointOfInterest[]> {
    const whereCondition: any = { is_active: true };

    if (type) {
      whereCondition.type = type;
    }

    return await this.poiRepository.find({
      where: whereCondition,
      relations: ['media'],
      order: {
        display_order: 'ASC',
        name: 'ASC',
      },
    });
  }

  async getPOIById(id: number): Promise<PointOfInterest> {
    const poi = await this.poiRepository.findOne({
      where: { id, is_active: true },
      relations: ['media'],
    });

    if (!poi) {
      throw new AppError('Point of Interest not found', 404);
    }

    return poi;
  }

  async getNearbyPOIs(
    latitude: number,
    longitude: number,
    radiusKm: number = 10
  ): Promise<any[]> {
    // Get all active POIs
    const allPOIs = await this.poiRepository.find({
      where: { is_active: true },
      relations: ['media'],
    });

    // Calculate distances and filter by radius
    const poisWithDistance = allPOIs
      .map((poi) => {
        const distance = poi.calculateDistance(latitude, longitude);
        return {
          id: poi.id,
          name: poi.name,
          type: poi.type,
          description: poi.description,
          latitude: Number(poi.latitude),
          longitude: Number(poi.longitude),
          facilities: poi.facilities,
          best_time_to_visit: poi.best_time_to_visit,
          accessibility_notes: poi.accessibility_notes,
          common_animals: poi.common_animals,
          is_active: poi.is_active,
          display_order: poi.display_order,
          created_at: poi.created_at,
          updated_at: poi.updated_at,
          media: poi.media,
          distance: Number(distance.toFixed(2)),
        };
      })
      .filter((poi) => poi.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    return poisWithDistance;
  }

  async getPOIsByType(type: POIType): Promise<PointOfInterest[]> {
    return await this.poiRepository.find({
      where: { type, is_active: true },
      relations: ['media'],
      order: {
        display_order: 'ASC',
        name: 'ASC',
      },
    });
  }
}
