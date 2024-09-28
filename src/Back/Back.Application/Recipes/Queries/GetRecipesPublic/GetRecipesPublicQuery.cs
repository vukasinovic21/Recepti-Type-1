using BuildingBlocks.Pagination;

namespace Back.Application.Recipes.Queries.GetRecipesPublic
{

    public record GetRecipesPublicQuery(PaginationRequest PaginationRequset)
       : IQuery<GetRecipesPublicResult>;

    public record GetRecipesPublicResult(PaginatedResult<RecipeDto> Recipes);
}
