namespace Back.Application.TypesOfFood.Queries.GetTypesOfFood
{
    public record GetTypesOfFoodQuery()
        : IQuery<GetTypesOfFoodResult>;

    public record GetTypesOfFoodResult(IEnumerable<TypeOfFood> TypesOfFood);
}
