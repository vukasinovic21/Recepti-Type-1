namespace Back.Application.Recipes.Queries.GetRecipesByUserPublic
{
    public class GetRecipesByUserPublicHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesByUserPublicQuery, GetRecipesByUserPublicResult>
    {
        public async Task<GetRecipesByUserPublicResult> Handle(GetRecipesByUserPublicQuery query, CancellationToken cancellationToken)
        {
            //get recipes public by UserId using dbContext
            //return result

            var recipes = await dbContext.Recipes
                .Include(r => r.RecipeItems)
                .AsNoTracking()
                .Where(r => r.UserId == UserId.Of(query.UserId))
                .Where(r => r.Shared == true)
                .OrderBy(r => r.RecipeName)
                .ToListAsync(cancellationToken);

            return new GetRecipesByUserPublicResult(recipes.ToRecipeDtotoList());
        }
    }
}
