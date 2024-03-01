import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal
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
    computed(() => {
      if (!this.#rentalId()) {
        this.#toastrService.error('Select rental on the top left corner');
        return;
      }

      this.fetchBranches();
    })
  }

  fetchBranches() {
    this.#httpClient.get(`/branches/getBranchByRentalId/${this.#rentalId}`).subscribe({
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
