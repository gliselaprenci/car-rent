import { Component, inject, Signal } from '@angular/core';
import { BranchesFormComponent } from './branches-form/branches-form.component';
import { BranchesService } from './branches.service';
import { BranchEntity } from './branches.types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [BranchesFormComponent, FaIconComponent],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss',
})
export class BranchesComponent {
  #branchesService: BranchesService = inject(BranchesService);
  branches: Signal<BranchEntity[]> = this.#branchesService.getBranches();
  branchEntity: BranchEntity;

  setBranchEntity(branchEntity: BranchEntity): void {
    this.branchEntity = branchEntity;
  }

  clearBranchEntity(): void {
    this.branchEntity = null;
  }

  deleteBranch(branchEntity: BranchEntity): void {
    this.#branchesService.deleteBranch(branchEntity);
  }

  protected readonly faTrash = faTrash;
}
