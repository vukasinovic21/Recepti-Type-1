namespace Back.Application.Ingredients.Queries.GetIngredients
{
    public class GetIngredientsHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetIngredientsQuery, GetIngredientsResult>
    {
        public async Task<GetIngredientsResult> Handle(GetIngredientsQuery query, CancellationToken cancellationToken)
        {

            var ingredients = await dbContext.Ingredients
                                .OrderBy(i => i.Name)
                                .ToListAsync(cancellationToken);

            return new GetIngredientsResult(ingredients.ToIngredientDtotoList());
        }
    }
}
