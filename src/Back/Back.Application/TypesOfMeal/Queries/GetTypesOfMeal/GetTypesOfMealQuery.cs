namespace Back.Application.TypesOfMeal.Queries.GetTypesOfMeal
{
    public record GetTypesOfMealQuery()
    : IQuery<GetTypesOfMealResult>;

    public record GetTypesOfMealResult(IEnumerable<TypeOfMealDto> TypesOfMeal);
}