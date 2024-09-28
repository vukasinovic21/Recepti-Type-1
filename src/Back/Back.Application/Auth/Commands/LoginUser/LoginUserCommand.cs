namespace Back.Application.Auth.Commands.LoginUser
{
    public record LoginUserCommand(LoginUserDto User)
        : ICommand<LoginUserResult>;

    public record LoginUserResult(string jwt);
}
