using Back.Application.Diets.Queries.GetDietsByUser;

namespace Back.Application.Diets.Queries.GetDietsByName
{
    public class GetDietsByNameHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetDietsByNameQuery, GetDietsByNameResult>
    {
        public async Task<GetDietsByNameResult> Handle(GetDietsByNameQuery query, CancellationToken cancellationToken)
        {
            //get recipes by name using dbContext
            //return result

            var diets = await dbContext.Diets
                .Include(d => d.PlanOfDiets)
                //.AsNoTracking()
                .Where(d => d.DietName.Contains(query.Name))
                .OrderBy(d => d.DietName)
                .ToListAsync(cancellationToken);

            return new GetDietsByNameResult(diets.ToDietDtotoList());
        }
    }
}
