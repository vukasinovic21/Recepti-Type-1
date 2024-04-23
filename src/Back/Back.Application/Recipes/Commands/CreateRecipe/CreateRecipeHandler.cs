namespace Back.Application.Recipes.Commands.CreateRecipe
{
    public class CreateRecipeHandler(IApplicationDbContext dbContext) 
        : ICommandHandler<CreateRecipeCommand, CreateRecipeResult>
    {
        public async Task<CreateRecipeResult> Handle(CreateRecipeCommand command, CancellationToken cancellationToken)
        {
            //Create Recipe entity from command object
            //save to database
            //return result

            var recipe = CreateNewRecipe(command.Recipe);

            dbContext.Recipes.Add(recipe);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new CreateRecipeResult(recipe.Id.Value);
        }

        private Recipe CreateNewRecipe(RecipeDto recipeDto)
        {
            var newRecipe = Recipe.Create(
                id: RecipeId.Of(Guid.NewGuid()),
                userId: UserId.Of(recipeDto.UserId),
                recipename: recipeDto.RecipeName,
                typeoffoodid: TypeOfFoodId.Of(recipeDto.TypeOfFoodId),
                instructions: recipeDto.Instructions,
                timetoprepare: recipeDto.TimeToPrepare,
                picture: recipeDto.Picture,
                shared: recipeDto.Shared
                );

            foreach(var recipeItemDto in recipeDto.RecipeItems)
            {
                newRecipe.Add(IngredientId.Of(recipeItemDto.IngredientId), recipeItemDto.Quantity);
            }

            return newRecipe;
        }
    }
}
