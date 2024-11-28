namespace Back.Application.Dtos
{
    public record UserDto(
        Guid Id,
        string Name,
        string LastName,
        string Username,
        string Email,
        DateOnly DateOfBirth,
        string Role,
        DateTime CreatedAt,
        string Sex,
        Guid QuestionId);
}