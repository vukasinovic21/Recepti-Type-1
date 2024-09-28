
namespace Back.Application.Likes.Commands.CheckLike
{

    public class CheckLikeHandler(IApplicationDbContext dbContext)
        : ICommandHandler<CheckLikeCommand, CheckLikeResult>
    {
        public async Task<CheckLikeResult> Handle(CheckLikeCommand command, CancellationToken cancellationToken)
        {
            //Check Like entity from command object
            //return result


            var alreadyLiked = await dbContext.Likes 
                .AsNoTracking()
                .Where(l => l.UserId == UserId.Of(command.Like.UserId))
                .Where(l => l.RecipeId == RecipeId.Of(command.Like.RecipeId))
                .FirstOrDefaultAsync();

            if (alreadyLiked != null)
                return new CheckLikeResult(true);
            else
                return new CheckLikeResult(false);
        }
    }
}
