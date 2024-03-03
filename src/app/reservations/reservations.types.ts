import { CustomerEntity } from '../customers/customer.types';

export type ReservationEntity = {
  reservation_id: string;
  booking_date: string;
  start_date: string;
  end_date: string;
  amount: string;
  reservedBy: string;
  customerEntity: CustomerEntity;
  pickup_branch_id: string;
  return_branch_id: string;
};
