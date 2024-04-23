using FluentValidation;

namespace Back.Application.TypesOfFood.Commands.CreateTypeOfFood
{
    public record CreateTypeOfFoodCommand(TypeOfFoodDto TypeOfFood)
        : ICommand<CreateTypeOfFoodResult>;

    public record CreateTypeOfFoodResult(Guid Id);

    public class CreateTypeOfFoodCommandValidator : AbstractValidator<CreateTypeOfFoodCommand>
    {
        public CreateTypeOfFoodCommandValidator()
        {
            RuleFor(x => x.TypeOfFood.TypeName).NotEmpty().WithMessage("Type name text is required");
        }
    }
}
