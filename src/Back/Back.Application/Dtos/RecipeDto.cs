namespace Back.Application.Dtos
{
    public record RecipeDto(
        Guid Id,
        DateTime CreatedAt,
        Guid UserId,
        string RecipeName,
        Guid TypeOfFoodId,
        string Instructions,
        int TimeToPrepare,
        string Picture,
        Boolean Shared,
        List<RecipeItemDto> RecipeItems);
}
