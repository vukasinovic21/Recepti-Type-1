namespace Back.Application.Diets.Queries.GetDietsByName
{
    public record GetDietsByNameQuery(string Name)
        : IQuery<GetDietsByNameResult>;

    public record GetDietsByNameResult(IEnumerable<DietDto> Diets);
}
