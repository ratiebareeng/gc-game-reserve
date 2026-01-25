import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/environment';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class JWTUtil {
  /**
   * Generate access token
   */
  static generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.accessExpiry as string,
    } as SignOptions);
  }

  /**
   * Generate refresh token
   */
  static generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpiry as string,
    } as SignOptions);
  }

  /**
   * Verify token and return payload
   */
  static verifyToken(token: string): JWTPayload {
    return jwt.verify(token, config.jwt.secret) as JWTPayload;
  }

  /**
   * Decode token without verification (for debugging)
   */
  static decodeToken(token: string): JWTPayload | null {
    return jwt.decode(token) as JWTPayload | null;
  }
}
