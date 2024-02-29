export type CarEntity = {
  id?: number,
  brand: string,
  model: string,
  year: number,
  color: string,
  status: CarStatus,
  rental_per_day: number,
}

export enum CarStatus {
  BOOKED = 'BOOKED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE'
}
