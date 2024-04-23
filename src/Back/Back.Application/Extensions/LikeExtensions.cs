namespace Back.Application.Extensions
{
    public static class LikeExtensions
    {
        public static IEnumerable<LikeDto> ToLikeDtotoList(this IEnumerable<Like> likes)
        {
            return likes.Select(like => new LikeDto(
                    Id: like.Id.Value,
                    RecipeId: like.Id.Value,
                    UserId: like.UserId.Value,
                    DateOfLike: like.DateOfLike
                    ));
        }
    }
}
