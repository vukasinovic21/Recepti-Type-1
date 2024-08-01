import { PlanOfDiet } from "./plan-of-diet"

export interface Diet 
{
    id: string,
    userId: string 
    dietName: string,
    nutritionId: string,
    createdAt: Date,
    planOfDiets: PlanOfDiet
}
