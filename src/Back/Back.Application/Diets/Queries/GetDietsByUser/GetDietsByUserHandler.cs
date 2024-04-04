namespace Back.Application.Diets.Queries.GetDietsByUser
{
    public class GetDietsByUserHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetDietsByUserQuery, GetDietsByUserResult>
    {
        public async Task<GetDietsByUserResult> Handle(GetDietsByUserQuery query, CancellationToken cancellationToken)
        {
            //get diets by UserId using dbContext
            //return result

            var diets = await dbContext.Diets
                .Include(d => d.PlanOfDiets)
                //.AsNoTracking()
                .Where(d => d.UserId == UserId.Of(query.UserId))
                .OrderBy(d => d.DietName)
                .ToListAsync(cancellationToken);

            return new GetDietsByUserResult(diets.ToDietDtotoList());
        }
    }
}
