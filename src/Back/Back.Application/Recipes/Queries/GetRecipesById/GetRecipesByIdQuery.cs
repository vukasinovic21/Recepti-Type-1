namespace Back.Application.Recipes.Queries.GetRecipesById
{
    public record GetRecipesByIdQuery(Guid Id)
        : IQuery<GetRecipesByIdResult>;

    public record GetRecipesByIdResult(RecipeNutritionsDto RecipeNutritions);
}
