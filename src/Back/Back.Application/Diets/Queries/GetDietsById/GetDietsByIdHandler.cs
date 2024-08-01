using Back.Application.Diets.Queries.GetDietsByName;

namespace Back.Application.Diets.Queries.GetDietsById
{
    public class GetDietsByIdHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetDietsByIdQuery, GetDietsByIdResult>
    {
        public async Task<GetDietsByIdResult> Handle(GetDietsByIdQuery query, CancellationToken cancellationToken)
        {
            //get recipes by id using dbContext
            //return result

            var diets = await dbContext.Diets
                .Include(d => d.PlanOfDiets)
                //.AsNoTracking()
                .Where(d => d.Id == DietId.Of(query.Id))
                .ToListAsync(cancellationToken);

            return new GetDietsByIdResult(diets.ToDietDtotoList());
        }
    }
}
