using Back.Application.Recipes.Queries.GetRecipesById;

namespace Back.Application.Likes.Queries.GetLikeNumber
{
    public class GetLikeNumberHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetLikeNumberQuery, GetLikeNumberResult>
    {
        public async Task<GetLikeNumberResult> Handle(GetLikeNumberQuery query, CancellationToken cancellationToken)
        {
            //get number of likes for recipe 
            //return result

            var likes = await dbContext.Likes
                                .Where(l => l.RecipeId == RecipeId.Of(query.Id))
                                .ToListAsync(cancellationToken);

            int totalCount = likes.Count;

            return new GetLikeNumberResult(totalCount);
        }
    }
}