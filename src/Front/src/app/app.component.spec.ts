import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { DietModule } from './diet/diet.module';
import { HomeModule } from './home/home.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PlanOfDietModule } from './plan-of-diet/plan-of-diet.module';
import { RecipeItemModule } from './recipe-item/recipe-item.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        UserModule,
        DietModule,
        RecipeModule,
        RecipeItemModule,
        PlanOfDietModule,
        IngredientModule,
        AuthModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => { 
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Recepti type 1 - Front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Recepti type 1 - Front');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toBeUndefined();
  });
});
