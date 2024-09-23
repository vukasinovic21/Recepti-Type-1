
namespace Back.Application.Auth.Queries.LoginUser
{
    public record LoginUserQuery(LoginUserDto loginDto)
        : IQuery<LoginUserResult>;

    public record LoginUserResult(string jwt);
}
