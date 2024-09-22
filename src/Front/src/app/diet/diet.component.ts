import { Component, OnInit, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DietService } from './diet.service';
import { Diet } from '../models/diet';
import { PlanOfDiet } from '../models/plan-of-diet';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent implements OnInit
{

  dietId: string = "";
  diet?: Diet;

  tableData: any[][] = [];
  headers: string[] = []; 
  rows: string[] = [];
  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(private dietService: DietService, private activatedRoute: ActivatedRoute, private router: Router, private renderer: Renderer2) {}

  mealTypeMap: { [key: string]: string } = {
    '01a5ba31-d107-41cc-9902-7da073e9f43b': 'Dorucak',
    '02863f22-e6ca-404f-a909-eb685273e786': 'Uzina prepodne',   
    '03d56869-ec65-86e7-4de2-e004e9167ac8': 'Rucak',
    '04bb129c-76e6-3cd1-db54-b41521ed91bb': 'Uzina popodne', 
    '056cb8fd-c9c7-435c-ac00-574c82929c34': 'Vecera',    
  };

  
  ngOnInit(): void 
  {
    this.activatedRoute.params.subscribe(params => {
      this.dietId = params['id']; 
      this.showDiet(this.dietId); 
    });

  }

  showDiet(dietId: string): void
  {
    this.dietService.getDietById(dietId).subscribe( diet => {
      this.diet = diet[0];
      this.makeTable();
    });
  }

  makeTable():void
  {
    const mealTypes = Object.keys(this.mealTypeMap);
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

    this.rows = mealTypes.map(typeId => this.mealTypeMap[typeId]);

    this.tableData = mealTypes.map(typeId => {
      return daysOfWeek.map(day => {
        const meal = this.diet?.planOfDiets.find(diet =>
          diet.dayOfWeek === day && diet.typeOfMealId === typeId
        );
        return meal ? 
        {
          recipeName: meal.recipeName,
          recipeId: meal.recipeId,
          picture: meal.picture 
        } : { recipeName: 'Primer recepta', recipeId: '', picture: '' };
      });
    });
  }

  showRecipeId(recipeId:string): void
  {
    this.router.navigate(['/recipes/' + recipeId]);
  }


  downloadDietPdf(): void
  {
    const element = this.content.nativeElement;

    const noPrintElements = document.querySelectorAll('.no-pdf');
    noPrintElements.forEach(el => 
    {
      (el as HTMLElement).style.display = 'none';
    });
    const img = document.querySelectorAll('.img');
    let originalDisplay: string;
    img.forEach(img =>
    {
      originalDisplay = (img as HTMLElement).style.display;
      (img as HTMLElement).style.display = 'block';
    });

    this.renderer.setStyle(element, 'width', '1500px');

    html2canvas(element).then((canvas) => 
    {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      
      const imgWidth = 297; 
      const pageHeight = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        let position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(this.diet?.dietName+'.pdf');
    });

    noPrintElements.forEach(el => 
    {
      (el as HTMLElement).style.display = 'block';
    });
    img.forEach(img =>
    {
      (img as HTMLElement).style.display = originalDisplay;
    });

    this.renderer.removeStyle(element, 'width');
  }

}
