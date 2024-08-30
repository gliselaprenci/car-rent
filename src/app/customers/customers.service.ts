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
import { UserEntity } from './customer.types';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  #httpClient: HttpClient = inject(HttpClient);
  #branchesService: BranchesService = inject(BranchesService);
  #toastrService: ToastrService = inject(ToastrService);
  #customers: WritableSignal<UserEntity[]> = signal<UserEntity[]>(null);
  branchId: Signal<number> = this.#branchesService.getSelectedBranchId();
  #randomCustomer: WritableSignal<UserEntity> = signal(null);

  constructor() {
    effect(() => {
      if (!this.branchId()) {
        this.#toastrService.error('Select branch on the top left corner');
        return;
      }

      this.fetchCustomers();
    });

    effect(
      () => {
        return this.#randomCustomer.set(
          this.#customers()?.at(
            this.randomInteger(0, this.#customers()?.length - 1),
          ),
        );
      },
      { allowSignalWrites: true },
    );
  }

  fetchCustomers() {
    if (!this.branchId()) {
      this.#toastrService.error('Select branch on the top left corner');
      return;
    }

    this.#httpClient
      .get(`/users/getUserByBranchId/${this.branchId()}`)
      .subscribe({
        next: (data) => {
          this.#customers.set(data as UserEntity[]);
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

  createCustomer(customerEntity: UserEntity) {
    this.#httpClient
      .post(
        `/users/createUser/${customerEntity.branchId}`,
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

  updateCustomer(userId: number, customerEntity: UserEntity) {
    this.#httpClient
      .put(`/users/updateUser/${userId}`, customerEntity)
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

  getCustomers(): Signal<UserEntity[]> {
    return this.#customers.asReadonly();
  }

  getRandomCustomer(): Signal<UserEntity> {
    return this.#randomCustomer;
  }

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
