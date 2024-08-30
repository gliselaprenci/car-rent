import { Component, inject, OnInit, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchesFormComponent } from '../branches/branches-form/branches-form.component';
import { CustomersFormComponent } from './customer-form/customers-form.component';
import { CustomersService } from './customers.service';
import { UserEntity } from './customer.types';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BranchesFormComponent,
    CustomersFormComponent,
    FaIconComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  #customersService: CustomersService = inject(CustomersService);
  customers: Signal<UserEntity[]> = this.#customersService.getCustomers();
  customerEntity: UserEntity;

  ngOnInit(): void {
    this.#customersService.fetchCustomers();
  }

  selectCustomerEntity(customerEntity: UserEntity): void {
    this.customerEntity = customerEntity;
  }

  clearCustomerEntity(): void {
    this.customerEntity = null;
  }
}
