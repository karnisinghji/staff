import { LocationCoordinates } from '../types';
export declare const geocodeLocation: (location: string) => Promise<LocationCoordinates | null>;
export declare const calculateDistance: (point1: LocationCoordinates, point2: LocationCoordinates) => number;
export declare const isWithinRadius: (point1: LocationCoordinates, point2: LocationCoordinates, radiusKm: number) => boolean;
