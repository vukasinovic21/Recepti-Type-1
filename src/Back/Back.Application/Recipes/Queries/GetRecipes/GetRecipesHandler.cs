using BuildingBlocks.Pagination;

namespace Back.Application.Recipes.Queries.GetRecipes
{
    public class GetRecipesHandler (IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesQuery, GetRecipesResult>
    {
        public async Task<GetRecipesResult> Handle(GetRecipesQuery query, CancellationToken cancellationToken) 
        {
            //get recipes with pagination
            //return result

            var pageIndex = query.PaginationRequset.PageIndex;
            var pageSize = query.PaginationRequset.PageSize;

            var totalCount = await dbContext.Recipes.LongCountAsync(cancellationToken);

            var recipes = await dbContext.Recipes
                                .Include(r => r.RecipeItems)
                                .OrderBy(r => r.RecipeName)
                                .Skip(pageSize * pageIndex)
                                .Take(pageSize)
                                .ToListAsync(cancellationToken);

            return new GetRecipesResult(
                new PaginatedResult<RecipeDto>(
                    pageIndex,
                    pageSize,
                    totalCount,
                    recipes.ToRecipeDtotoList()));
        }
    }

}
