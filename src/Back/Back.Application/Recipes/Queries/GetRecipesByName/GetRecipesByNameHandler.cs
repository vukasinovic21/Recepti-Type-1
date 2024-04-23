namespace Back.Application.Recipes.Queries.GetRecipesByName
{
    public class GetRecipesByNameHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesByNameQuery, GetRecipesByNameResult>
    {
        public async Task<GetRecipesByNameResult> Handle(GetRecipesByNameQuery query, CancellationToken cancellationToken)
        {
            //get recipes by name using dbContext
            //return result

            var recipes = await dbContext.Recipes
                .Include(r => r.RecipeItems)
                .AsNoTracking()
                .Where(r => r.RecipeName.Contains(query.Name))
                .OrderBy(r => r.RecipeName)
                .ToListAsync(cancellationToken);

            return new GetRecipesByNameResult(recipes.ToRecipeDtotoList());
        }
    }
}