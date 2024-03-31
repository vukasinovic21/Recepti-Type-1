namespace Back.Application.TypesOfFood.Queries.GetTypesOfFood
{
    public class GetTypesOfFoodHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetTypesOfFoodQuery, GetTypesOfFoodResult>
    {
        public async Task<GetTypesOfFoodResult> Handle(GetTypesOfFoodQuery query, CancellationToken cancellationToken)
        {

            var typesoffood = await dbContext.TypesOfFood
                                .OrderBy(tof => tof.Id)
                                .ToListAsync(cancellationToken);

            return new GetTypesOfFoodResult(typesoffood.ToTypesOfFoodDtotoList());
        }
    }
}
