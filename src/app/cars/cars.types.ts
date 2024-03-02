import { ImageEntity } from '../common/image-display/image-display.types';

export type CarEntity = {
  car_id?: number,
  brand: string,
  model: string,
  year: number,
  color: string,
  status: CarStatus,
  rental_per_day: number,
  branch_id: string,
  image_id?: string,
  image?: ImageEntity
}

export enum CarStatus {
  BOOKED = 'BOOKED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE'
}
