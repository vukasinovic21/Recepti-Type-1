namespace Back.Application.TypesOfMeal.Queries.GetTypesOfMeal
{
    public class GetTypesOfMealHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetTypesOfMealQuery, GetTypesOfMealResult>
    {
        public async Task<GetTypesOfMealResult> Handle(GetTypesOfMealQuery query, CancellationToken cancellationToken)
        {

            var typesofmeal = await dbContext.TypesOfMeal
                                .OrderBy(tom => tom.Id)
                                .ToListAsync(cancellationToken);
            
            return new GetTypesOfMealResult(typesofmeal.ToTypesOfMealDtotoList());
        }
    }
}
