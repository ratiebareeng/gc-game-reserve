import { AppDataSource } from '../../config/database';
import { ActivityType } from '../../database/entities/activity-type.entity';
import { AppError } from '../../utils/errors';

export class ActivityTypeService {
  private activityTypeRepository = AppDataSource.getRepository(ActivityType);

  /**
   * Get all active activity types
   */
  async getAllActivityTypes(): Promise<ActivityType[]> {
    return await this.activityTypeRepository.find({
      where: { is_active: true },
      order: { id: 'ASC' },
    });
  }

  /**
   * Get activity type by ID
   */
  async getActivityTypeById(id: number): Promise<ActivityType> {
    const activityType = await this.activityTypeRepository.findOne({
      where: { id },
    });

    if (!activityType) {
      throw new AppError('Activity type not found', 404);
    }

    return activityType;
  }
}
