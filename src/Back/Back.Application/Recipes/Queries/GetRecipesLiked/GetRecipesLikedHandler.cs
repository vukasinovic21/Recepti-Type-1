
namespace Back.Application.Recipes.Queries.GetRecipesLiked
{

    public class GetRecipesLikedHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesLikedQuery, GetRecipesLikedResult>
    {
        public async Task<GetRecipesLikedResult> Handle(GetRecipesLikedQuery query, CancellationToken cancellationToken)
        {
            //get recipes that are liked by UserId using dbContext
            //return result

            var likes = await dbContext.Likes
                .Where(l => l.UserId == UserId.Of(query.UserId))
                .ToListAsync();

            List<Recipe> allRecipes = new List<Recipe>();

            foreach (var l in likes)
            {
                var oneRecipe = await dbContext.Recipes
                    .Include(r => r.RecipeItems)
                    .AsNoTracking()
                    .Where(r => r.Id == l.RecipeId)
                    .FirstAsync();
                allRecipes.Add(oneRecipe);
            }

            return new GetRecipesLikedResult(allRecipes.ToRecipeDtotoList());
        }
    }
}
