namespace Back.Application.Recipes.Queries.GetRecipesIngredientsById
{
    public record GetRecipesIngredientsByIdQuery(Guid Id)
        : IQuery<GetRecipesIngredientsByIdResult>;

    public record GetRecipesIngredientsByIdResult(IEnumerable<RecipeIngredientsDto> RecipeIngredients);
}
