using BuildingBlocks.Pagination;
namespace Back.Application.Recipes.Queries.GetRecipesPublic
{
    public class GetRecipesPublicHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesPublicQuery, GetRecipesPublicResult>
    {
        public async Task<GetRecipesPublicResult> Handle(GetRecipesPublicQuery query, CancellationToken cancellationToken)
        {
            //get public recipes with pagination
            //return result

            var pageIndex = query.PaginationRequset.PageIndex;
            var pageSize = query.PaginationRequset.PageSize;

            var totalCount = await dbContext.Recipes.Where(r => r.Shared == true).LongCountAsync(cancellationToken);

            var recipes = await dbContext.Recipes
                                .Where(r => r.Shared == true)
                                .Include(r => r.RecipeItems)
                                .OrderBy(r => r.RecipeName)
                                .Skip(pageSize * pageIndex)
                                .Take(pageSize)
                                .ToListAsync(cancellationToken);

            return new GetRecipesPublicResult(
                new PaginatedResult<RecipeDto>(
                    pageIndex,
                    pageSize,
                    totalCount,
                    recipes.ToRecipeDtotoList()));
        }
    }
}
