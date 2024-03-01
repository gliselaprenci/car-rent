import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsFormComponent } from './rentals-form.component';

describe('RentalsFormComponent', () => {
  let component: RentalsFormComponent;
  let fixture: ComponentFixture<RentalsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
