import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent implements OnInit
{

  dietId: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void 
  {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ?? 'default-value';
    this.showDiet(id);
  }

  showDiet(dietId: string): void
  {

  }

}
