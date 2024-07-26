namespace Back.Application.Recipes.Queries.GetRecipesById
{
    public record GetRecipesByIdQuery(Guid Id)
        : IQuery<GetRecipesByIdResult>;

    public record GetRecipesByIdResult(IEnumerable<RecipeDto> Recipes);
}
