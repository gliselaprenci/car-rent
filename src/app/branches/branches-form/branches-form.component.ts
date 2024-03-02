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
import { BranchEntity } from '../branches.types';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../utility/utility.service';
import { BranchesService } from '../branches.service';
import { RentalsService } from '../../rentals/rentals.service';
import { RentalEntity } from '../../rentals/rentals.types';

@Component({
  selector: 'app-branches-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.scss',
})
export class BranchesFormComponent implements OnChanges {
  @Input() branchEntity: BranchEntity;
  @Output() clearBranchEntity: EventEmitter<any> = new EventEmitter<any>();
  #formBuilder: FormBuilder = inject(FormBuilder);
  #rentalsService: RentalsService = inject(RentalsService);
  #branchesService: BranchesService = inject(BranchesService);
  #toastrService: ToastrService = inject(ToastrService);
  #utilityService: UtilityService = inject(UtilityService);
  selectedRentalId: Signal<number> = this.#rentalsService.getSelectedRentalId();

  rentals: Signal<RentalEntity[]> = this.#rentalsService.getRentals();

  branchForm: FormGroup = this.#formBuilder.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    rental_id: [null, [Validators.required]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.branchEntity?.currentValue) {
      this.branchForm.addControl('branch_id', new FormControl(''));
      this.branchForm.get('branch_id').disable();
      this.branchForm.patchValue(this.branchEntity);

      const rentalIdControl: AbstractControl = this.branchForm.get('rental_id');
      rentalIdControl.setValue(this.selectedRentalId());
      rentalIdControl.disable();
    } else {
      this.branchForm.get('rental_id').enable();
      this.branchForm.removeControl('branch_id');
    }
  }

  resetBranchEntity() {
    this.clearBranchEntity.emit();
    this.branchForm.reset();
    this.branchForm.get('rental_id').enable();
  }

  handleBranchFormSubmit() {
    const hasErrors: boolean = Object.keys(this.branchForm.controls)?.some(
      (key: string) => {
        if (this.branchForm.controls[key].errors) {
          this.#toastrService.error(
            `Error creating Branch \n ${this.#utilityService.generateErrorMessageFromObject(key, this.branchForm.controls[key].errors)}`,
          );

          return true;
        }
      },
    );

    if (hasErrors) return;

    const branchEntity: BranchEntity = {
      address: this.branchForm.get('address').value,
      city: this.branchForm.get('city').value,
      rental_id: this.branchForm.get('rental_id').value,
    };

    if (this.branchEntity) {
      this.#branchesService.updateBranch(
        this.branchForm.get('branch_id').value,
        branchEntity,
      );
    } else {
      this.#branchesService.createBranch(branchEntity);
    }

    this.#rentalsService.selectRentalId(this.branchForm.get('rental_id').value);

    this.resetBranchEntity();
  }
}
