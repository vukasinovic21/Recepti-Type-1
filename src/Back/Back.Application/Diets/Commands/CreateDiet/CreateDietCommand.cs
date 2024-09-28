using FluentValidation;

namespace Back.Application.Diets.Commands.CreateDiet
{
    public record CreateDietCommand(DietDto Diet)
        : ICommand<CreateDietResult>;

    public record CreateDietResult(Guid Id);

    public class CreateDietCommandValidator : AbstractValidator<CreateDietCommand>
    {
        public CreateDietCommandValidator()
        {
            RuleFor(x => x.Diet.DietName).NotEmpty().WithMessage("Diet name is required");
            RuleFor(x => x.Diet.UserId).NotNull().WithMessage("UserId is required");
            RuleFor(x => x.Diet.PlanOfDiets).NotEmpty().WithMessage("PlanOfDiets should not be empty");
        }
    }
}
