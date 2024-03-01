import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalSelectComponent } from './rental-select.component';

describe('RentalSelectComponent', () => {
  let component: RentalSelectComponent;
  let fixture: ComponentFixture<RentalSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
