export async function searchLocationPhoton(query: string) {
  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
    );
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      return data.features.map((f: any) => ({
        name: f.properties.name,
        city: f.properties.city || f.properties.state || "",
        country: f.properties.country || "",
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      }));
    }
    return [];
  } catch (e) {
    console.error("Photon search error:", e);
    return [];
  }
}