using BuildingBlocks.Pagination;

namespace Back.Application.Recipes.Queries.GetRecipes
{
    public record GetRecipesQuery(PaginationRequest PaginationRequset)
        : IQuery<GetRecipesResult>;

    public record GetRecipesResult(PaginatedResult<RecipeDto> Recipes);

}
