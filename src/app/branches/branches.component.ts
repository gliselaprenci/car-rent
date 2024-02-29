import { Component, inject, OnInit, Signal } from '@angular/core';
import { BranchesFormComponent } from './branches-form/branches-form.component';
import { BranchesService } from './branches.service';
import { BranchEntity } from './branches.types';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [BranchesFormComponent],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss',
})
export class BranchesComponent implements OnInit {
  #branchesService: BranchesService = inject(BranchesService);
  branches: Signal<BranchEntity[]> = this.#branchesService.getBranches();

  ngOnInit(): void {
    this.#branchesService.fetchBranches();
  }
}
