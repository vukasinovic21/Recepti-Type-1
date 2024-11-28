import { RecipeItem } from "./recipe-item";

export interface Recipe 
{
    id: string,
    createdAt: Date,
    userId: string,
    recipeName: string,
    typeOfFoodId: string,
    instructions: string,
    timeToPrepare: number,
    picture: string,
    shared: boolean,
    recipeItems: RecipeItem[]
}
