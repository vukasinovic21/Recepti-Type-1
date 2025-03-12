package recepti_type1.backend_java.Models;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "\"RecipeItems\"")
public class RecipeItem
{
    @Id
    private UUID Id;
    private UUID RecipeId;
    private UUID IngredientId;
    private Float Quantity;

    public RecipeItem() {}

    public RecipeItem(UUID recipeId, UUID ingredientId, Float quantity)
    {
        this.Id = UUID.randomUUID();
        this.RecipeId = recipeId;
        this.IngredientId = ingredientId;
        this.Quantity = quantity;
    }

        public UUID getId() {
        return Id;
    }

        public void setId(UUID id) {
        this.Id = id;
    }

        public UUID getRecipeId() {
        return RecipeId;
    }

        public void setRecipeId(UUID recipeId) {
        this.RecipeId = recipeId;
    }

        public UUID getIngredientId() {
        return IngredientId;
    }

        public void setIngredientId(UUID ingredientId) {
        this.IngredientId = ingredientId;
    }

        public Float getQuantity() {
        return Quantity;
    }

        public void setQuantity(Float quantity) {
        this.Quantity = quantity;
    }
}
