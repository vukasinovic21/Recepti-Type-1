import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from './recipe.service';
import { Router } from '@angular/router';
import { __param } from 'tslib';
import { ActivatedRoute } from '@angular/router';
import { RecipeNutritions } from '../models/recipe-nutritions';
import { RecipeIngredients } from '../models/recipe-ingredients';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent 
{

    recipe?: Recipe;  
    recipeNutritions?: RecipeNutritions;
    recipeIngredients: RecipeIngredients[] = [];
    kolicina!: number;
    @ViewChild('content', { static: false }) content!: ElementRef;

    constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private renderer: Renderer2){}

    ngOnInit(): void 
    {
      let id = this.activatedRoute.snapshot.paramMap.get('id') ?? 'default-value';

      this.getNutritions(id);
      this.getInfo(id);
      this.getIngredients(id);
    }

    getNutritions(recipeId:string): void 
    {
      this.recipeService.getRecipeNutritions(recipeId).subscribe( recipeNutritions => {
        this.recipeNutritions = recipeNutritions;
      });
    }

    getInfo(recipeId:string): void //recipes/id{id}
    {
      this.recipeService.getRecipeInfo(recipeId).subscribe( recipe => {
        this.recipe = recipe[0]
      });
    }

    getIngredients(recipeId:string): void 
    {
      this.recipeService.getRecipeIngredients(recipeId).subscribe( recipeIngredients => {
        this.recipeIngredients = recipeIngredients;
      });
    }

    downloadRecipePdf(): void
    {
      //uraditi da se recept skida kao pdf fajl
      const element = this.content.nativeElement;

      const noPrintElements = document.querySelectorAll('.no-pdf');
      noPrintElements.forEach(el => 
      {
        (el as HTMLElement).style.display = 'none';
      });

      this.renderer.setStyle(element, 'width', '958px');

      html2canvas(element).then((canvas) => 
      {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; 
        const pageHeight = 297; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(this.recipe?.recipeName+'.pdf');
      });

      noPrintElements.forEach(el => 
      {
        (el as HTMLElement).style.display = 'block';
      });

      this.renderer.removeStyle(element, 'width');
    }

}