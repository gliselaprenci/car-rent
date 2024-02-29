import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerEntity } from '../customer.types';

@Component({
  selector: 'app-customers-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.scss',
})
export class CustomersFormComponent implements OnInit {
  @Input() customerEntity: CustomerEntity;
  #formBuilder: FormBuilder = inject(FormBuilder);

  branchForm: FormGroup = this.#formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.customerEntity) {
      this.branchForm.addControl('customer_id', new FormControl(''));
    }
  }
}
