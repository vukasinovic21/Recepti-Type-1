namespace Back.Application.Recipes.Queries.GetRecipesByUser
{
    public record GetRecipesByUserQuery(Guid UserId)
       : IQuery<GetRecipesByUserResult>;

    public record GetRecipesByUserResult(IEnumerable<RecipeDto> Recipes);
}
