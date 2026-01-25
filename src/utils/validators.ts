export class Validators {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number (Botswana format)
   * Accepts: +267XXXXXXXX or 267XXXXXXXX or XXXXXXXX
   */
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+267|267)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Normalize phone number to international format
   */
  static normalizePhone(phone: string): string {
    const cleaned = phone.replace(/\s/g, '');
    if (cleaned.startsWith('+267')) {
      return cleaned;
    }
    if (cleaned.startsWith('267')) {
      return '+' + cleaned;
    }
    return '+267' + cleaned;
  }

  /**
   * Validate date is in the future
   */
  static isFutureDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }

  /**
   * Validate date is within allowed booking range
   */
  static isWithinBookingRange(
    date: Date,
    minDays: number,
    maxDays: number
  ): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + minDays);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + maxDays);

    return date >= minDate && date <= maxDate;
  }
}
