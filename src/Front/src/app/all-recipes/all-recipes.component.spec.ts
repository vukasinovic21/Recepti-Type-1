import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipesComponent } from './all-recipes.component';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AllRecipesComponent', () => {
  let component: AllRecipesComponent;
  let fixture: ComponentFixture<AllRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRecipesComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        FlexModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule,
        HttpClientTestingModule, 
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
