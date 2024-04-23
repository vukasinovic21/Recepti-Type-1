using Back.Application.Dtos;

namespace Back.Application.Likes.Commands.CreateLike
{
    public class CreateLikeHandler(IApplicationDbContext dbContext)
        : ICommandHandler<CreateLikeCommand, CreateLikeResult>
    {
        public async Task<CreateLikeResult> Handle(CreateLikeCommand command, CancellationToken cancellationToken)
        {
            //Create Like entity from command object
            //save to database
            //return result

            var like = CreateNewLike(command.Like);

            dbContext.Likes.Add(like);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new CreateLikeResult(like.Id.Value);
        }

        private Like CreateNewLike(LikeDto likeDto)
        {
            var newLike = Like.Create(
                recipeId: RecipeId.Of(likeDto.RecipeId),
                userId: UserId.Of(likeDto.UserId)
                );

            return newLike;
        }
    }
}
