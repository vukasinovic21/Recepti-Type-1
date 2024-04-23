namespace Back.Application.Recipes.Queries.GetRecipesByUser
{
    public class GetRecipesByUserHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesByUserQuery, GetRecipesByUserResult>
    {
        public async Task<GetRecipesByUserResult> Handle(GetRecipesByUserQuery query, CancellationToken cancellationToken)
        {
            //get recipes by UserId using dbContext
            //return result

            var recipes = await dbContext.Recipes
                .Include(r => r.RecipeItems)
                .AsNoTracking()
                .Where(r => r.UserId == UserId.Of(query.UserId))
                .OrderBy(r => r.RecipeName)
                .ToListAsync(cancellationToken);

            return new GetRecipesByUserResult(recipes.ToRecipeDtotoList());
        }
    }
}
