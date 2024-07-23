import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDietsComponent } from './all-diets.component';

describe('AllDietsComponent', () => {
  let component: AllDietsComponent;
  let fixture: ComponentFixture<AllDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllDietsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
