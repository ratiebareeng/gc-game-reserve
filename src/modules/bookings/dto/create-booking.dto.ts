export interface CreateBookingDto {
  visit_date: string; // YYYY-MM-DD format
  visit_time?: string; // HH:mm format
  activity_type_id: number;
  number_of_visitors: number;
  number_of_vehicles: number;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  special_requests?: string;
}
