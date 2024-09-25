import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { DietModule } from './diet/diet.module';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeItemModule } from './recipe-item/recipe-item.module';
import { PlanOfDietModule } from './plan-of-diet/plan-of-diet.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { AuthModule } from './auth/auth.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) 
{
  console.log('Loading translations from ../assets/locales/');
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
