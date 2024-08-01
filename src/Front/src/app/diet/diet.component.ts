import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DietService } from './diet.service';
import { Diet } from '../models/diet';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent implements OnInit
{

  dietId: string = '';
  diet!: Diet;

  constructor(private dietService: DietService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void 
  {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ?? 'default-value';
    this.showDiet(id);
  }

  showDiet(dietId: string): void
  {
    this.dietService.getDietById(this.dietId).subscribe( diet => {
      this.diet = diet;
    });
  }

}
