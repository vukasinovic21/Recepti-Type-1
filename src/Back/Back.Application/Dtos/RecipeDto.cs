using Back.Domain.Models;
using Back.Domain.ValueObjects;

namespace Back.Application.Dtos
{
    public record RecipeDto(
        Guid Id,
        Guid UserId,
        string RecipeName,
        Guid TypeOfFoodId,
        string Instructions,
        int TimeToPrepare,
        string Picture,
        Boolean Shared,
        List<RecipeItemDto> RecipeItems);
}
