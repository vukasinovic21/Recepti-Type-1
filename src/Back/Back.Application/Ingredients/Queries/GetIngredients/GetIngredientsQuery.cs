namespace Back.Application.Ingredients.Queries.GetIngredients
{
    public record GetIngredientsQuery()
        : IQuery<GetIngredientsResult>;

    public record GetIngredientsResult(IEnumerable<IngredientDto> Ingredients);
}

