export type NormalizedLocation = {
  city: string;
  locality: string | null;
  state: string;
  lat: number;
  lng: number;
};

export function normalizePhotonFeature(f: any): NormalizedLocation {
  return {
    city: f.properties.city || f.properties.town || f.properties.village || f.properties.name,
    locality: f.properties.district || f.properties.suburb || null,
    state: f.properties.state || "",
    lat: f.geometry.coordinates[1],
    lng: f.geometry.coordinates[0],
  };
}
