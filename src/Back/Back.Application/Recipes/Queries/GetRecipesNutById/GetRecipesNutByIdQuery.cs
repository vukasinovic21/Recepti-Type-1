namespace Back.Application.Recipes.Queries.GetRecipesById
{
    public record GetRecipesNutByIdQuery(Guid Id)
        : IQuery<GetRecipesNutByIdResult>;

    public record GetRecipesNutByIdResult(RecipeNutritionsDto RecipeNutritions);
}
