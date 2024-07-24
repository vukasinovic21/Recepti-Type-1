using FluentValidation;

namespace Back.Application.Recipes.Commands.CreateRecipe
{
    public record CreateRecipeCommand(RecipeDto Recipe)
        : ICommand<CreateRecipeResult>;

    public record CreateRecipeResult(Guid Id);

    public class CreateRecipeCommandValidator : AbstractValidator<CreateRecipeCommand>
    {
        public CreateRecipeCommandValidator() 
        {
            RuleFor(x => x.Recipe.RecipeName).NotEmpty().WithMessage("Recipe name is required");
            RuleFor(x => x.Recipe.UserId).NotNull().WithMessage("UserId is required");
            RuleFor(x => x.Recipe.RecipeItems).NotEmpty().WithMessage("RecipeItems should not be empty");
        }
    }
}
