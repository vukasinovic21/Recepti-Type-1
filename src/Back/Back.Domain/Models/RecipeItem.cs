using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class RecipeItem : Entity<RecipeItemId>
    {
        internal RecipeItem(RecipeId recipeId, IngredientId ingredientId, decimal quantity)
        {
            Id = RecipeItemId.Of(Guid.NewGuid());
            RecipeId = recipeId;
            IngredientId = ingredientId;
            Quantity = quantity;
        }

        public RecipeId RecipeId { get; private set; } = default!;
        public IngredientId IngredientId { get; private set; } = default!;
        public decimal Quantity { get; private set; } = default!;
    }
}
