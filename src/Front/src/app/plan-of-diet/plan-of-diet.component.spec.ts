import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOfDietComponent } from './plan-of-diet.component';

describe('PlanOfDietComponent', () => {
  let component: PlanOfDietComponent;
  let fixture: ComponentFixture<PlanOfDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanOfDietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanOfDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
