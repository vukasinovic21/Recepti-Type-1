namespace Back.Application.Recipes.Queries.GetRecipesByUserPublic
{
    public record GetRecipesByUserPublicQuery(Guid UserId)
      : IQuery<GetRecipesByUserPublicResult>;

    public record GetRecipesByUserPublicResult(IEnumerable<RecipeDto> Recipes);
}
