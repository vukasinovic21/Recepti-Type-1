using FluentValidation;

namespace Back.Application.Recipes.Commands.UpdateRecipe
{
    public record UpdateRecipeCommand(RecipeDto Recipe)
        : ICommand<UpdateRecipeResult>;

    public record UpdateRecipeResult(bool IsSuccess);

    public class UpdateRecipeCommandValidator : AbstractValidator<UpdateRecipeCommand>
    {
        public UpdateRecipeCommandValidator()
        {
            RuleFor(x => x.Recipe.Id).NotEmpty().WithMessage("Id is required");
            RuleFor(x => x.Recipe.RecipeName).NotEmpty().WithMessage("Recipe name is required");
            RuleFor(x => x.Recipe.UserId).NotNull().WithMessage("UserId is required");
        }
    }
}
