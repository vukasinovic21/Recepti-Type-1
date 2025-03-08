import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeOfFoodComponent } from './add-type-of-food.component';

describe('AddTypeOfFoodComponent', () => {
  let component: AddTypeOfFoodComponent;
  let fixture: ComponentFixture<AddTypeOfFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTypeOfFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTypeOfFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
