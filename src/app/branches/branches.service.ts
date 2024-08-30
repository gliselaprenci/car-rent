import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchEntity } from './branches.types';
import { RentalsService } from '../rentals/rentals.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  #httpClient: HttpClient = inject(HttpClient);
  #rentalsService: RentalsService = inject(RentalsService);
  #toastrService: ToastrService = inject(ToastrService);
  #branches: WritableSignal<BranchEntity[]> = signal<BranchEntity[]>(null);
  #selectedBranchId: WritableSignal<number> = signal<number>(null);
  #rentalId: Signal<number> = this.#rentalsService.getSelectedRentalId();

  constructor() {
    effect(() => {
      if (!this.#rentalId()) {
        this.#toastrService.error('Select rental on the top left corner');
        return;
      }

      this.fetchBranches();
    });
  }

  fetchBranches() {
    this.#httpClient
      .get(`/branches/getBranchByRentalId/${this.#rentalId()}`)
      .subscribe({
        next: (data) => {
          this.#branches.set(data as BranchEntity[]);
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
      });
  }

  createBranch(branchEntity: BranchEntity) {
    this.#httpClient
      .post(`/branches/createBranch/${branchEntity.rentalId}`, branchEntity)
      .subscribe({
        next: () => {
          this.#toastrService.success('Branch created successfully');
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          this.fetchBranches();
        },
      });
  }

  updateBranch(id: number, branchEntity: BranchEntity) {
    this.#httpClient
      .put(`/branches/updateBranches/${id}`, branchEntity)
      .subscribe({
        next: () => {
          this.#toastrService.success('Branch updated successfully');
        },
        error: (error) => {
          this.#toastrService.error(error.message);
        },
        complete: () => {
          this.fetchBranches();
        },
      });
  }

  getBranches(): Signal<BranchEntity[]> {
    return this.#branches.asReadonly();
  }

  selectBranchId(branchId: number) {
    this.#selectedBranchId.set(branchId);
  }

  getSelectedBranchId(): Signal<number> {
    return this.#selectedBranchId.asReadonly();
  }
}
