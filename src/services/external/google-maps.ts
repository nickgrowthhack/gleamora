import { calculateHaversineDistance } from '@/lib/utils';

// Define types for libraries compatible with @react-google-maps/api
type Libraries = ("places" | "drawing" | "geometry" | "localContext" | "visualization")[];

export const GOOGLE_MAPS_LIBRARIES: Libraries = ['places'];

// Configuration constants
export const TULSA_COORDS = { lat: 36.1540, lng: -95.9928 };
export const MAX_DISTANCE_MILES = 40;

export interface ServiceAvailabilityResult {
  isServiceable: boolean;
  distance: number;
  error?: string;
}

export interface LocationData {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export class GoogleMapsService {
  /**
   * Checks if the location is within the service area.
   * @param lat Latitude of the customer
   * @param lng Longitude of the customer
   */
  static checkServiceAvailability(lat: number, lng: number): ServiceAvailabilityResult {
    const distance = calculateHaversineDistance(TULSA_COORDS.lat, TULSA_COORDS.lng, lat, lng);
    
    if (distance > MAX_DISTANCE_MILES) {
      return {
        isServiceable: false,
        distance,
        error: `We currently only service locations within ${MAX_DISTANCE_MILES} miles of Tulsa.`
      };
    }

    return {
      isServiceable: true,
      distance
    };
  }

  /**
   * Extracts relevant location data from a Google Maps PlaceResult.
   * @param place The PlaceResult object from Google Maps API
   */
  static extractLocationData(place: any): LocationData | null {
    if (!place.geometry || !place.geometry.location) {
      return null;
    }

    // Handle both function calls (Google Maps API) and direct values (if mocked/serialized)
    const lat = typeof place.geometry.location.lat === 'function' 
      ? place.geometry.location.lat() 
      : place.geometry.location.lat;
      
    const lng = typeof place.geometry.location.lng === 'function' 
      ? place.geometry.location.lng() 
      : place.geometry.location.lng;

    return {
      lat,
      lng,
      formattedAddress: place.formatted_address || ''
    };
  }
}
