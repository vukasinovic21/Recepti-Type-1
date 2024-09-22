using FluentValidation;

namespace Back.Application.Auth.Commands.RegisterUser
{
    public record RegisterUserCommand(RegisterUserDto User)
        : ICommand<RegisterUserResult>;

    public record RegisterUserResult(Guid Id);

    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator()
        {
            RuleFor(x => x.User.Email).NotEmpty().WithMessage("Email is required");
            RuleFor(x => x.User.Name).NotNull().WithMessage("Name is required");
            RuleFor(x => x.User.Username).NotEmpty().WithMessage("Username should not be empty");
            RuleFor(x => x.User.LastName).NotNull().WithMessage("Lastname is required");
            RuleFor(x => x.User.Sex).NotEmpty().WithMessage("Sex should not be empty");
        }
    }
}
