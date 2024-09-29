namespace Back.Application.Recipes.Queries.GetRecipesLiked
{

    public record GetRecipesLikedQuery(Guid UserId)
  : IQuery<GetRecipesLikedResult>;

    public record GetRecipesLikedResult(IEnumerable<RecipeDto> Recipes);
}
