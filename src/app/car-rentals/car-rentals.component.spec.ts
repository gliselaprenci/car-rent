import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentalsComponent } from './car-rentals.component';

describe('CarRentalsComponent', () => {
  let component: CarRentalsComponent;
  let fixture: ComponentFixture<CarRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarRentalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
