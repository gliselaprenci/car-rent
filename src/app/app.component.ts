import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BranchesService } from './branches/branches.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #branchesService: BranchesService = inject(BranchesService);

  ngOnInit(): void {
    this.#branchesService.fetchBranches();
  }
}
