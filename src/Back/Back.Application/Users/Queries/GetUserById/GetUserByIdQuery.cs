namespace Back.Application.Users.Queries.GetUserById
{
    public record GetUserByIdQuery(Guid Id)
        : IQuery<GetUserByIdResult>;

    public record GetUserByIdResult(IEnumerable<UserDto> User);
}
