import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchEntity } from './branches.types';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  #httpClient: HttpClient = inject(HttpClient);
  branches: WritableSignal<BranchEntity[]> = signal<BranchEntity[]>(null);
  selectedBranchId: WritableSignal<number> = signal<number>(null);

  fetchBranches() {
    this.#httpClient.get('/branches/getBranches').subscribe({
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
    return this.branches.asReadonly();
  }

  selectBranchId(branchId: number) {
    this.selectedBranchId.set(branchId);
  }

  getSelectedBranchId(): Signal<number> {
    return this.selectedBranchId.asReadonly();
  }
}
