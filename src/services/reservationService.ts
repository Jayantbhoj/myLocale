import { supabase } from "@/src/lib/supabase";
import { Reservation, ReservationStatus } from "@/src/schemas/internal/reservationsSchema";

export async function getConfirmedCount(eventId: string): Promise<number> {
  const { count, error } = await supabase
    .from("reservations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("status", "confirmed");

  if (error) throw error;
  return count ?? 0;
}


export async function reserveSpot(
  userId: string,
  eventId: string,
  eventCapacity: number
): Promise<Reservation> {

  const confirmedCount = await getConfirmedCount(eventId);

  const status: ReservationStatus =
    confirmedCount < eventCapacity ? "confirmed" : "waitlisted";

  const { data, error } = await supabase
    .from("reservations")
    .insert([{ user_id: userId, event_id: eventId, status }])
    .select("*, events(*)")
    .single();

  if (error) throw error;
  return data;
}


export async function cancelReservation(userId: string, eventId: string): Promise<void> {
  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("user_id", userId)
    .eq("event_id", eventId);

  if (error) throw error;
}


export async function getUserReservations(userId: string): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, events(*)")
    .eq("user_id", userId); 

  if (error) throw error;
  return data;
}
