namespace Back.Application.Dtos
{
    public record RecipeItemDto(Guid RecipeId, Guid IngredientId, int Quantity);
}
