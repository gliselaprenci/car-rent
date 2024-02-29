import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchesService } from '../branches/branches.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerEntity } from './customer.types';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  #httpClient: HttpClient = inject(HttpClient);
  #branchesService: BranchesService = inject(BranchesService);
  #toastrService: ToastrService = inject(ToastrService);
  customers: WritableSignal<CustomerEntity[]> = signal<CustomerEntity[]>(null);
  branchId: Signal<number> = this.#branchesService.getSelectedBranchId();

  constructor() {
    computed(() => {
      if (!this.branchId()) {
        this.#toastrService.error('Select branch on the top left corner');
        return;
      }

      this.fetchCustomers();
    })
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
          console.log('Data received:', data);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
  }

  getCustomers(): Signal<CustomerEntity[]> {
    return this.customers.asReadonly();
  }
}
