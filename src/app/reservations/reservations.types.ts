import { UserEntity } from '../customers/customer.types';

export type ReservationEntity = {
  reservationId: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  amount: string;
  reservedBy: string;
  customerEntity: UserEntity;
  pickup_branchId: string;
  return_branchId: string;
};
