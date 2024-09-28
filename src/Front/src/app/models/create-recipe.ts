import { RecipeItem } from "./recipe-item";

export interface CreateRecipe 
{
    userId: string,
    recipeName: string,
    typeOfFoodId: string,
    instructions: string,
    timeToPrepare: number,
    picture: string, //treba da bude file(slika) nekad
    shared: boolean,
    recipeItems: RecipeItem[]
}
