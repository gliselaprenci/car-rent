import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  Signal,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerEntity } from '../customer.types';
import { BranchesService } from '../../branches/branches.service';
import { BranchEntity } from '../../branches/branches.types';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../utility/utility.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.scss',
})
export class CustomersFormComponent implements OnChanges {
  @Input() customerEntity: CustomerEntity;
  @Output() clearCustomerEntity: EventEmitter<any> = new EventEmitter<any>();
  #formBuilder: FormBuilder = inject(FormBuilder);
  #customersService: CustomersService = inject(CustomersService);
  #branchesService: BranchesService = inject(BranchesService);
  #toastrService: ToastrService = inject(ToastrService);
  #utilityService: UtilityService = inject(UtilityService);
  branches: Signal<BranchEntity[]> = this.#branchesService.getBranches();
  selectedBranchId: Signal<number> =
    this.#branchesService.getSelectedBranchId();

  customerForm: FormGroup = this.#formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    branch_id: ['', [Validators.required]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.customerEntity?.currentValue) {
      this.customerForm.addControl('costumer_id', new FormControl(''));
      this.customerForm.get('costumer_id').disable();
      this.customerForm.patchValue(this.customerEntity);

      const branchIdControl: AbstractControl =
        this.customerForm.get('branch_id');
      branchIdControl.setValue(this.selectedBranchId());
      branchIdControl.disable();
    } else {
      this.customerForm.get('branch_id').enable();
      this.customerForm.removeControl('costumer_id');
    }
  }

  resetCustomerEntity() {
    this.clearCustomerEntity.emit();
    this.customerForm.reset();
    this.customerForm.get('branch_id').enable();
  }

  handleCustomerFormSubmit() {
    const hasErrors: boolean = Object.keys(this.customerForm.controls)?.some(
      (key: string) => {
        if (this.customerForm.controls[key].errors) {
          this.#toastrService.error(
            `Error creating Customer \n ${this.#utilityService.generateErrorMessageFromObject(key, this.customerForm.controls[key].errors)}`,
          );

          return true;
        }
      },
    );

    if (hasErrors) return;

    const customerEntity: CustomerEntity = {
      firstName: this.customerForm.get('firstName').value,
      lastName: this.customerForm.get('lastName').value,
      email: this.customerForm.get('email').value,
      address: this.customerForm.get('address').value,
      branch_id: this.customerForm.get('branch_id').value,
    };

    if (this.customerEntity) {
      this.#customersService.updateCustomer(
        this.customerForm.get('costumer_id').value,
        customerEntity,
      );
    } else {
      this.#customersService.createCustomer(customerEntity);
    }

    this.#branchesService.selectBranchId(
      this.customerForm.get('branch_id').value,
    );
    this.resetCustomerEntity();
  }
}
