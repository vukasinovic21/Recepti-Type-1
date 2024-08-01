import { RecipeItem } from "./recipe-item";
import { TypeOfFood } from "./type-of-food";
import { User } from "./user";

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
    recipeItems: RecipeItem
}
