namespace Back.Application.Diets.Commands.DeleteDiets
{
    public class DeleteDietHandler(IApplicationDbContext dbContext)
        : ICommandHandler<DeleteDietCommand, DeleteDietResult>
    {
        public async Task<DeleteDietResult> Handle(DeleteDietCommand command, CancellationToken cancellationToken)
        {
            //Delete Diet entity from command object
            //save to database
            //return result

            var dietId = DietId.Of(command.DietId);
            var diet = await dbContext.Diets
                .FindAsync([dietId], cancellationToken: cancellationToken);

            if (diet is null)
            {
                throw new RecipeNotFoundException(command.DietId);
            }


            dbContext.Diets.Remove(diet);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new DeleteDietResult(true);
        }
    }
}
