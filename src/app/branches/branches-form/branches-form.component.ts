import { Component, inject, Input, OnInit } from '@angular/core';
import { BranchEntity } from '../branches.types';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-branches-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.scss',
})
export class BranchesFormComponent implements OnInit {
  @Input() branchEntity: BranchEntity;
  #formBuilder: FormBuilder = inject(FormBuilder);

  branchForm: FormGroup = this.#formBuilder.group({
    address: [''],
    city: [''],
  });

  ngOnInit() {
    if (this.branchEntity) {
      this.branchForm.addControl('id', new FormControl(''));
    }
  }
}
