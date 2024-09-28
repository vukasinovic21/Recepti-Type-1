import { Component } from '@angular/core';
import { Diet } from '../models/diet';
import { Router, ActivatedRoute } from '@angular/router';
import { DietService } from '../diet/diet.service';

@Component({
  selector: 'app-all-diets',
  templateUrl: './all-diets.component.html',
  styleUrl: './all-diets.component.css'
})
export class AllDietsComponent 
{
  diets: Diet[] = [];  
  filteredDiets: Diet[] = [];
  sortOrder = "";
  selectedDietId: string | null = null;

  constructor(private dietService: DietService, private router: Router, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void 
  {
    this.dietService.getAllDietsUser(localStorage.getItem("userid")).subscribe( diets => {
        this.diets = diets;
    });

    
    this.activatedRoute.queryParams.subscribe(() => {
      this.dietService.getAllDietsUser(localStorage.getItem("userid")).subscribe( diets => {
        this.diets = diets;
        this.filteredDiets = diets;
      });
    });
  }

  showDietId(dietId:string): void 
  {
    this.selectedDietId = dietId;
    this.router.navigate(['/diets/' + dietId]); 
  }

  search(event: Event): void
  {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredDiets = this.diets.filter(
      diet => diet.dietName.toLowerCase().includes(searchTerm))

    this.sortDiets(this.sortOrder);  
  }

  sortDiets(sortValue: string)
  {
    this.sortOrder = sortValue;
    if(this.sortOrder === "nameA-Z")
    {
      this.filteredDiets.sort((a, b) => a.dietName.localeCompare(b.dietName));
    }
    else if(this.sortOrder === "nameZ-A")
    {
      this.filteredDiets.sort((a, b) => b.dietName.localeCompare(a.dietName));
    }
    else if(this.sortOrder === "newest")
    {
      this.filteredDiets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    else if(this.sortOrder === "oldest")
    {
      this.filteredDiets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  }
}
