using Back.Domain.Models;

namespace Back.Application.Extensions
{
    public static class UserExtensions
    {
        public static IEnumerable<UserDto> ToUserDtotoList(this IEnumerable<User> users)
        {
            return users.Select(user => new UserDto(
                    Id: user.Id.Value,
                    Name: user.Name,
                    LastName: user.LastName,
                    Username: user.Username,
                    Email: user.Email,
                    DateOfBirth: user.DateOfBirth,
                    Role: user.Role,
                    CreatedAt: user.CreatedAt.Value,
                    Sex: user.Sex,
                    QuestionId: user.QuestionId.Value
                    ));
        }
    }
}