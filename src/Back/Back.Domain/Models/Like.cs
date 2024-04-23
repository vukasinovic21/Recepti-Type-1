using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class Like : Entity<LikeId>
    {
        /*internal Like(RecipeId recipeId, UserId userId)
        {
            Id = LikeId.Of(Guid.NewGuid());
            RecipeId = recipeId;
            UserId = userId;
            DateOfLike = DateTime.UtcNow;
        }*/

        public RecipeId RecipeId { get; private set; } = default!;
        public UserId UserId { get; private set; } = default!;
        public DateTime DateOfLike { get; private set; } = default!;


        public static Like Create(RecipeId recipeId, UserId userId)
        {
            var like = new Like
            {
                Id = LikeId.Of(Guid.NewGuid()), // id se generise sam
                RecipeId = recipeId,
                UserId = userId,
                DateOfLike = DateTime.UtcNow // za datum i vreme se postavlja trenutni DateTime
            };

            return like;
        }
    }
}
