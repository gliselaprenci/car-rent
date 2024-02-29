import { Component, inject, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchesService } from '../branches.service';
import { BranchEntity } from '../branches.types';

@Component({
  selector: 'app-branch-select',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './branch-select.component.html',
  styleUrl: './branch-select.component.scss',
})
export class BranchSelectComponent {
  #branchesService: BranchesService = inject(BranchesService);
  branches: Signal<BranchEntity[]> = this.#branchesService.getBranches();
  selectedBranch: Signal<number> = this.#branchesService.getSelectedBranchId();

  handleBranchChange(branchId: number) {
    this.#branchesService.selectBranchId(branchId);
  }
}
