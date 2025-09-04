export type ReservationStatus = "confirmed" | "cancelled" | "waitlisted";

export interface Reservation {
  id: string;
  user_id: string;
  event_id: string;
  reserved_at: string;
  status: ReservationStatus;
  events?: {
    id: string;
    name: string;
    location: string;
    start_time: string;
    end_time: string;
    cover_image_url?: string;
  };
}
