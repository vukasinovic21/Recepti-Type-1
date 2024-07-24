namespace Back.Application.TypesOfFood.Commands.CreateTypeOfFood
{
    public class CreateTypeOfFoodHandler(IApplicationDbContext dbContext)
        : ICommandHandler<CreateTypeOfFoodCommand, CreateTypeOfFoodResult>
    {
        public async Task<CreateTypeOfFoodResult> Handle(CreateTypeOfFoodCommand command, CancellationToken cancellationToken)
        {
            //Create TypeOfFood entity from command object
            //save to database
            //return result

            var typeoffood = CreateNewTypeOfFood(command.TypeOfFood);

            dbContext.TypesOfFood.Add(typeoffood);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new CreateTypeOfFoodResult(typeoffood.Id.Value);
        }

        private TypeOfFood CreateNewTypeOfFood(TypeOfFoodDto typeoffoodDto)
        {
            var newTypeOfFood = TypeOfFood.Create(
                id: TypeOfFoodId.Of(Guid.NewGuid()),
                typename: typeoffoodDto.TypeName
                );

            return newTypeOfFood;
        }
    }
}
