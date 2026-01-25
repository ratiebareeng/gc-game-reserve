import { AppDataSource } from '../../config/database';
import { User } from '../../database/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordUtil } from '../../utils/password.util';
import { JWTUtil } from '../../utils/jwt.util';
import { Validators } from '../../utils/validators';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../../utils/errors';
import { ERROR_MESSAGES } from '../../config/constants';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Register a new user
   */
  async register(dto: RegisterDto): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    // Validate email format
    if (!Validators.isValidEmail(dto.email)) {
      throw new BadRequestError('Invalid email format');
    }

    // Validate password strength
    const passwordValidation = PasswordUtil.validateStrength(dto.password);
    if (!passwordValidation.isValid) {
      throw new BadRequestError(passwordValidation.errors.join(', '));
    }

    // Validate phone number if provided
    if (dto.phone_number && !Validators.isValidPhone(dto.phone_number)) {
      throw new BadRequestError('Invalid phone number format');
    }

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictError(ERROR_MESSAGES.EMAIL_EXISTS);
    }

    // Check if phone number already exists
    if (dto.phone_number) {
      const normalizedPhone = Validators.normalizePhone(dto.phone_number);
      const existingPhone = await this.userRepository.findOne({
        where: { phone_number: normalizedPhone },
      });

      if (existingPhone) {
        throw new ConflictError(ERROR_MESSAGES.PHONE_EXISTS);
      }
    }

    // Hash password
    const hashedPassword = await PasswordUtil.hash(dto.password);

    // Create user
    const user = this.userRepository.create({
      email: dto.email.toLowerCase(),
      password_hash: hashedPassword,
      first_name: dto.first_name,
      last_name: dto.last_name,
      phone_number: dto.phone_number
        ? Validators.normalizePhone(dto.phone_number)
        : undefined,
    });

    await this.userRepository.save(user);

    // Generate tokens
    const accessToken = JWTUtil.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = JWTUtil.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, accessToken, refreshToken };
  }

  /**
   * Login user
   */
  async login(dto: LoginDto): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Verify password
    const isPasswordValid = await PasswordUtil.compare(
      dto.password,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Generate tokens
    const accessToken = JWTUtil.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = JWTUtil.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, accessToken, refreshToken };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return user;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const payload = JWTUtil.verifyToken(refreshToken);

      // Verify user still exists
      const user = await this.getUserById(payload.userId);

      // Generate new tokens
      const newAccessToken = JWTUtil.generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const newRefreshToken = JWTUtil.generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }
}
