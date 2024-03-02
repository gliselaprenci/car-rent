import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchesService } from '../branches/branches.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerEntity } from './customer.types';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  #httpClient: HttpClient = inject(HttpClient);
  #branchesService: BranchesService = inject(BranchesService);
  #toastrService: ToastrService = inject(ToastrService);
  #customers: WritableSignal<CustomerEntity[]> = signal<CustomerEntity[]>(null);
  branchId: Signal<number> = this.#branchesService.getSelectedBranchId();

  constructor() {
    effect(() => {
      if (!this.branchId()) {
        this.#toastrService.error('Select branch on the top left corner');
        return;
      }

      this.fetchCustomers();
    });
  }

  fetchCustomers() {
    if (!this.branchId()) {
      this.#toastrService.error('Select branch on the top left corner');
      return;
    }

    this.#httpClient
      .get(`/customers/getCustomerByBranchId/${this.branchId()}`)
      .subscribe({
        next: (data) => {
          this.#customers.set(data as CustomerEntity[]);
          console.log('Data received:', data);
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
  }

  createCustomer(customerEntity: CustomerEntity) {
    this.#httpClient
      .post(
        `/customers/createCustomer/${customerEntity.branch_id}`,
        customerEntity,
      )
      .subscribe({
        next: () => {
          this.#toastrService.success('Customer created successfully');
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          this.fetchCustomers();
        },
      });
  }

  updateCustomer(id: number, customerEntity: CustomerEntity) {
    this.#httpClient
      .put(`/customers/updateCustomer/${id}`, customerEntity)
      .subscribe({
        next: () => {
          this.#toastrService.success('Customer updated successfully');
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          this.fetchCustomers();
        },
      });
  }

  getCustomers(): Signal<CustomerEntity[]> {
    return this.#customers.asReadonly();
  }
}
