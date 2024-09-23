namespace Back.Application.Users.Queries.GetAllUsers
{
    public class GetAllUsersHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetAllUsersQuery, GetAllUsersResult>
    {
        public async Task<GetAllUsersResult> Handle(GetAllUsersQuery query, CancellationToken cancellationToken)
        {
            //get all users using dbContext
            //return result

            var user = await dbContext.Users
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return new GetAllUsersResult(user.ToUserDtotoList());
        }
    }
}