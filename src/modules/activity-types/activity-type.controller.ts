import { Request, Response, NextFunction } from 'express';
import { ActivityTypeService } from './activity-type.service';

export class ActivityTypeController {
  private activityTypeService: ActivityTypeService;

  constructor() {
    this.activityTypeService = new ActivityTypeService();
  }

  /**
   * Get all activity types
   */
  getAllActivityTypes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const activityTypes = await this.activityTypeService.getAllActivityTypes();

      res.status(200).json({
        success: true,
        data: activityTypes,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get activity type by ID
   */
  getActivityTypeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const activityType = await this.activityTypeService.getActivityTypeById(Number(id));

      res.status(200).json({
        success: true,
        data: activityType,
      });
    } catch (error) {
      next(error);
    }
  };
}
