
using Back.Application.Dtos;

namespace Back.Application.Dtos
{
    public record RegisterUserDto(
        Guid Id,
        string Name,
        string LastName,
        string Username,
        string Email,
        string Passwordhash,
        Guid QuestionId,
        string ForgotPasswordAnswerHash,
        DateOnly DateOfBirth,
        string Sex);
}
