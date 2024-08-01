namespace Back.Application.Dtos
{

    public record RecipeIngredientsDto
    (
        Guid RecipeId, 
        Guid IngredientId, 
        string IngredientName,
        decimal Quantity
    );
}
