namespace Back.Application.Diets.Queries.GetDietsByUser
{
    public record GetDietsByUserQuery(Guid UserId)
   : IQuery<GetDietsByUserResult>;

    public record GetDietsByUserResult(IEnumerable<DietDto> Diets);
}
