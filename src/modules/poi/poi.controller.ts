import { Request, Response, NextFunction } from 'express';
import { POIService } from './poi.service';
import { POIType } from '../../config/constants';

export class POIController {
  private poiService: POIService;

  constructor() {
    this.poiService = new POIService();
  }

  getAllPOIs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { type } = req.query;

      const pois = await this.poiService.getAllPOIs(type as string);

      res.status(200).json({
        success: true,
        data: pois,
      });
    } catch (error) {
      next(error);
    }
  };

  getPOIById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const poi = await this.poiService.getPOIById(parseInt(id, 10));

      res.status(200).json({
        success: true,
        data: poi,
      });
    } catch (error) {
      next(error);
    }
  };

  getNearbyPOIs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { lat, lon, radius } = req.query;

      if (!lat || !lon) {
        res.status(400).json({
          success: false,
          error: 'Latitude and longitude are required',
        });
        return;
      }

      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lon as string);
      const radiusKm = radius ? parseFloat(radius as string) : 10;

      if (isNaN(latitude) || isNaN(longitude)) {
        res.status(400).json({
          success: false,
          error: 'Invalid latitude or longitude',
        });
        return;
      }

      const pois = await this.poiService.getNearbyPOIs(
        latitude,
        longitude,
        radiusKm
      );

      res.status(200).json({
        success: true,
        data: pois,
      });
    } catch (error) {
      next(error);
    }
  };

  getPOIsByType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { type } = req.params;

      // Validate POI type
      if (!Object.values(POIType).includes(type as POIType)) {
        res.status(400).json({
          success: false,
          error: `Invalid POI type. Must be one of: ${Object.values(POIType).join(', ')}`,
        });
        return;
      }

      const pois = await this.poiService.getPOIsByType(type as POIType);

      res.status(200).json({
        success: true,
        data: pois,
      });
    } catch (error) {
      next(error);
    }
  };
}
