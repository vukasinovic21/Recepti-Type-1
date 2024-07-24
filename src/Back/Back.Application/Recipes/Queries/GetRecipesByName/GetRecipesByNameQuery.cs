namespace Back.Application.Recipes.Queries.GetRecipesByName
{
    public record GetRecipesByNameQuery(string Name) 
        : IQuery<GetRecipesByNameResult>;

    public record GetRecipesByNameResult(IEnumerable<RecipeDto> Recipes);
}
