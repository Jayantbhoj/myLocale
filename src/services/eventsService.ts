import { supabase } from "@/src/lib/supabase";
import { Event } from "@/src/schemas/internal/eventsSchema";
import * as FileSystem from "expo-file-system";
import mime from "mime";

export async function uploadImage(uri: string, userId: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const ext = mime.getExtension(mime.getType(uri) || "image/jpeg");
    const filePath = `${userId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("event-image")
      .upload(filePath, bytes, {
        contentType: mime.getType(uri) || "image/jpeg",
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("event-image")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    throw new Error("Image upload failed. Please try again.");
  }
}

export async function createEvent(
  event: Omit<Event, "id" | "created_at">,
  userId: string
) {
  let coverImageUrl = event.cover_image_url;

  if (coverImageUrl && coverImageUrl.startsWith("file://")) {
    coverImageUrl = await uploadImage(coverImageUrl, userId);
  }

  const { data, error } = await supabase
    .from("events")
    .insert([{ ...event, cover_image_url: coverImageUrl }])
    .select("*")
    .single();

  if (error) throw error;
  return data as Event;
}

export async function fetchMyEvents(userId: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("creator_id", userId)
    .order("date", { ascending: true }) 
    .order("start_time", { ascending: true }); 

  if (error) {
    console.error("Error fetching my events:", error);
    throw error;
  }

  return data as Event[];
}

export async function fetchFeaturedEvents(city: string, limit = 3): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("city", city)
    .order("date", { ascending: true }) 
    .order("start_time", { ascending: true }) 
    .limit(limit);

  if (error) {
    console.error("Error fetching featured events:", error);
    return [];
  }

  return data || [];
}

export async function fetchAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true }); 

  if (error) {
    throw error;
  }

  return data as Event[];
}