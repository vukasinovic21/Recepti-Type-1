namespace Back.Application.Recipes.Commands.DeleteRecipe
{
    public class DeleteRecipeHandler(IApplicationDbContext dbContext)
        : ICommandHandler<DeleteRecipeCommand, DeleteRecipeResult>
    {
        public async Task<DeleteRecipeResult> Handle(DeleteRecipeCommand command, CancellationToken cancellationToken)
        {
            //Delete Recipe entity from command object
            //save to database
            //return result

            var recipeId = RecipeId.Of(command.RecipeId);
            var recipe = await dbContext.Recipes
                .FindAsync([recipeId], cancellationToken: cancellationToken);

            if(recipe is null)
            {
                throw new RecipeNotFoundException(command.RecipeId);
            }

            dbContext.Recipes.Remove(recipe);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new DeleteRecipeResult(true);
        }
    }
}
