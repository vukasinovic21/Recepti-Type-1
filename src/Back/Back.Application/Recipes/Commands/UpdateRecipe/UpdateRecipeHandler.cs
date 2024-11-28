namespace Back.Application.Recipes.Commands.UpdateRecipe
{
    public class UpdateRecipeHandler(IApplicationDbContext dbContext)
        : ICommandHandler<UpdateRecipeCommand, UpdateRecipeResult>
    {
        public async Task<UpdateRecipeResult> Handle(UpdateRecipeCommand command, CancellationToken cancellationToken)
        {
            //Update Recipe entity from command object
            //save to database
            //return result

            var recipeId = RecipeId.Of(command.Recipe.Id);
            var recipe = await dbContext.Recipes
                .FindAsync([recipeId], cancellationToken: cancellationToken);

            if(recipe is null)
            {
                throw new RecipeNotFoundException(command.Recipe.Id);
            }

            UpdateRecipeWithNewValues(recipe, command.Recipe);

            dbContext.Recipes.Update(recipe);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new UpdateRecipeResult(true);
        }

        public void UpdateRecipeWithNewValues(Recipe recipe, RecipeDto recipeDto)
        {
            recipe.Update(
                recipename: recipeDto.RecipeName,
                typeoffoodid: TypeOfFoodId.Of(recipeDto.TypeOfFoodId),
                instructions: recipeDto.Instructions,
                shared: recipeDto.Shared,
                timetoprepare: recipeDto.TimeToPrepare);
        }
    }
}
