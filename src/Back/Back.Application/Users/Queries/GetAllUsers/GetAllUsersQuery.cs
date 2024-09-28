namespace Back.Application.Users.Queries.GetAllUsers
{
    public record GetAllUsersQuery()
        : IQuery<GetAllUsersResult>;

    public record GetAllUsersResult(IEnumerable<UserDto> Users);
}
