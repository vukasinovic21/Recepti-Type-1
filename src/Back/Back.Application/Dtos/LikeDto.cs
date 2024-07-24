namespace Back.Application.Dtos
{
    public record LikeDto(
        Guid Id,
        Guid RecipeId,
        Guid UserId,
        DateTime DateOfLike);
}
