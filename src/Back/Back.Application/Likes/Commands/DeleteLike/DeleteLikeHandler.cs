namespace Back.Application.Likes.Commands.DeleteLike
{
    public class DeleteLikeHandler(IApplicationDbContext dbContext)
        : ICommandHandler<DeleteLikeCommand, DeleteLikeResult>
    {
        public async Task<DeleteLikeResult> Handle(DeleteLikeCommand command, CancellationToken cancellationToken)
        {
            //Delete Like entity from command object
            //save to database
            //return result

            var likeId = LikeId.Of(command.LikeId);
            var like = await dbContext.Likes
                .FindAsync([likeId], cancellationToken: cancellationToken);

            if (like is null)
            {
                throw new LikeNotFoundException(command.LikeId);
            }

            dbContext.Likes.Remove(like);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new DeleteLikeResult(true);
        }
    }
}
