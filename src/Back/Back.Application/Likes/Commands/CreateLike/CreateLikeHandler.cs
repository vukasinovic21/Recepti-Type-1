using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

            var alreadyLiked = await dbContext.Likes //ako vec postoji lajk od ovog korisnika za izabrani recept, to znaci da je sada on odlajkovao recept, tj vise mu se ne svidja.
                .AsNoTracking()
                .Where(l => l.UserId == UserId.Of(command.Like.UserId))
                .Where(l => l.RecipeId == RecipeId.Of(command.Like.RecipeId))
                .FirstOrDefaultAsync();
                //.ToListAsync(cancellationToken);

            if(alreadyLiked != null) //ako postoji obrisi ga, a ako ne postoji nastavi dalje
            {
                dbContext.Likes.Remove(alreadyLiked);
                await dbContext.SaveChangesAsync(cancellationToken);
                throw new InvalidOperationException("Like has been removed");
            }

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
