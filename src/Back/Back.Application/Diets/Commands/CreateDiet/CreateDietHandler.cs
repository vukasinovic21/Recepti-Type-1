namespace Back.Application.Diets.Commands.CreateDiet
{
    public class CreateDietHandler(IApplicationDbContext dbContext)
        : ICommandHandler<CreateDietCommand, CreateDietResult>
    {
        public async Task<CreateDietResult> Handle(CreateDietCommand command, CancellationToken cancellationToken)
        {
            //Create Diet entity from command object
            //save to database
            //return result

            var diet = CreateNewDiet(command.Diet);

            dbContext.Diets.Add(diet);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new CreateDietResult(diet.Id.Value);
        }

        private Diet CreateNewDiet(DietDto dietDto)
        {
            var newDiet = Diet.Create(
                id: DietId.Of(Guid.NewGuid()),
                userId: UserId.Of(dietDto.UserId),
                dietname: dietDto.DietName,
                nutriotionId: UserId.Of(dietDto.UserId)
                );

            foreach (var PlanOfDietDto in dietDto.PlanOfDiets)
            {
                newDiet.Add(RecipeId.Of(PlanOfDietDto.RecipeId), TypeOfMealId.Of(PlanOfDietDto.TypeOfMealId), PlanOfDietDto.DayOfWeek, PlanOfDietDto.Quantity);
            }

            return newDiet;
        }
    }
}
