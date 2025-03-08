package recepti_type1.backend_java.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "\"RecipeItems\"")
public class RecipeItem
{
    @Id
    private UUID Id;

    @ManyToOne
    @JoinColumn(name = "\"RecipeId\"")
    @JsonBackReference
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "\"IngredientId\"")
    private Ingredient ingredient;
    private Float Quantity;

    public RecipeItem() {}

    public RecipeItem(Recipe recipeId, Ingredient ingredientId, Float quantity)
    {
        this.Id = UUID.randomUUID();
        this.recipe = recipeId;
        this.ingredient = ingredientId;
        this.Quantity = quantity;
    }

        public UUID getId() {
        return Id;
    }

        public void setId(UUID id) {
        this.Id = id;
    }

        public Recipe getRecipeId() {
        return recipe;
    }

        public void setRecipeId(Recipe recipeId) {
        this.recipe = recipeId;
    }

        public Ingredient getIngredientId() {
        return ingredient;
    }

        public void setIngredientId(Ingredient ingredientId) {
        this.ingredient = ingredientId;
    }

        public Float getQuantity() {
        return Quantity;
    }

        public void setQuantity(Float quantity) {
        this.Quantity = quantity;
    }
}
