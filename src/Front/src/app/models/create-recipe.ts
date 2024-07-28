import { RecipeItem } from "./recipe-item";

export interface CreateRecipe 
{
    userId: string,
    recipeName: string,
    typeOfFood: string,
    instructions: string,
    timeToPrepare: number,
    picture: string, //treba da bude file(slika) nekad
    shared: boolean,
    recipeItems: RecipeItem[]
}
