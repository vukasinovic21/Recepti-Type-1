namespace Back.Application.Users.Queries.GetUserById
{
    public class GetUserByIdHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetUserByIdQuery, GetUserByIdResult>
    {
        public async Task<GetUserByIdResult> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
        {
            //get user by Id using dbContext
            //return result

            var user = await dbContext.Users
                .AsNoTracking()
                .Where(u => u.Id == UserId.Of(query.Id))
                .ToListAsync(cancellationToken);

            return new GetUserByIdResult(user.ToUserDtotoList());
        }
    }
}
