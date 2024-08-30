import { ImageEntity } from '../common/image-display/image-display.types';

export type CarEntity = {
  carId?: number,
  brand: string,
  model: string,
  productionYear: number,
  colour: string,
  status: CarStatus,
  rentalPerDay: number,
  branchId: string,
  imageId?: string,
  image?: ImageEntity
}

export enum CarStatus {
  BOOKED = 'BOOKED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE'
}
