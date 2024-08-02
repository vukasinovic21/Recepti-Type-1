import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DietService } from './diet.service';
import { Diet } from '../models/diet';
import { PlanOfDiet } from '../models/plan-of-diet';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent implements OnInit
{

  dietId: string = '';
  diet!: Diet;

  tableData: any[][] = [];
  headers: string[] = []; 
  rows: string[] = [];

  constructor(private dietService: DietService, private activatedRoute: ActivatedRoute) {}

  mealTypeMap: { [key: string]: string } = {
    '01a5ba31-d107-41cc-9902-7da073e9f43b': 'Dorucak',
    '02863f22-e6ca-404f-a909-eb685273e786': 'Uzina prepodne',   
    '03d56869-ec65-86e7-4de2-e004e9167ac8': 'Rucak',
    '04bb129c-76e6-3cd1-db54-b41521ed91bb': 'Uzina popodne', 
    '056cb8fd-c9c7-435c-ac00-574c82929c34': 'Vecera',    
  };

  
  ngOnInit(): void 
  {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ?? 'default-value';
    this.showDiet(id);
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
        const meal = this.diet.planOfDiets.find(diet =>
          diet.dayOfWeek === day && diet.typeOfMealId === typeId
        );
        return meal ? meal.recipeName : ''; //ako mozemo da vratimo ceo objekat pa u html-u da prikazem vise stvari
      });
    });

    /*this.tableData = Array.from({ length: 5 }, (_, rowIndex) =>
      Array.from({ length: 7 }, (_, colIndex) => rowIndex * 7 + colIndex + 1)
    );*/
  }

}
