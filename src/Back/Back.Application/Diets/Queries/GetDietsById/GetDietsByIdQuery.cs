namespace Back.Application.Diets.Queries.GetDietsById
{
    public record GetDietsByIdQuery(Guid Id)
        : IQuery<GetDietsByIdResult>;

    public record GetDietsByIdResult(IEnumerable<DietInfoDto> Diets);
}
