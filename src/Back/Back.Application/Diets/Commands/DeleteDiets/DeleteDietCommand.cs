using FluentValidation;

namespace Back.Application.Diets.Commands.DeleteDiets
{
    public record DeleteDietCommand(Guid DietId)
        : ICommand<DeleteDietResult>;

    public record DeleteDietResult(bool IsSuccess);

    public class DeleteDietCommandValidator : AbstractValidator<DeleteDietCommand>
    {
        public DeleteDietCommandValidator()
        {
            RuleFor(x => x.DietId).NotEmpty().WithMessage("DietId is required");
        }
    }
}
