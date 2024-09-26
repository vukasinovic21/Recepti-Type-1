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

            if(recipe.Picture != "defaultRecipe.jpg")
            {
                var currentDirectory = Directory.GetCurrentDirectory();
                var parentDirectory = Directory.GetParent(currentDirectory).Parent.FullName; // K:\\Recepti-Type-1\\src\\Front
                var uploadsFolder = Path.Combine(parentDirectory, "Front", "src", "assets", "images");
                var filePath = Path.Combine(uploadsFolder, recipe.Picture);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }

            return new DeleteRecipeResult(true);
        }
    }
}
