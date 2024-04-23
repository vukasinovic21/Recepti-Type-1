using FluentValidation;

namespace Back.Application.Recipes.Commands.DeleteRecipe
{
    public record DeleteRecipeCommand(Guid RecipeId)
        : ICommand<DeleteRecipeResult>;

    public record DeleteRecipeResult(bool IsSuccess);

    public class DeleteRecipeCommandValidator : AbstractValidator<DeleteRecipeCommand>
    {
        public DeleteRecipeCommandValidator()
        {
            RuleFor(x => x.RecipeId).NotEmpty().WithMessage("RecipeId is required");
        }
    }
}
