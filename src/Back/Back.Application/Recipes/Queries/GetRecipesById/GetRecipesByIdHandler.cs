
using Back.Application.Recipes.Queries.GetRecipesByName;

namespace Back.Application.Recipes.Queries.GetRecipesById
{
    public class GetRecipesByIdHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesByIdQuery, GetRecipesByIdResult>
    {
        public async Task<GetRecipesByIdResult> Handle(GetRecipesByIdQuery query, CancellationToken cancellationToken)
        {
            //get recipes by Id using dbContext
            //return result

            var recipes = await dbContext.Recipes
                .Include(r => r.RecipeItems)
                .AsNoTracking()
                .Where(r => r.Id == RecipeId.Of(query.Id))
                .OrderBy(r => r.RecipeName)
                .ToListAsync(cancellationToken);

            return new GetRecipesByIdResult(recipes.ToRecipeDtotoList());
        }
    }
}
