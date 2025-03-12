package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Services.RecipeService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/recipes")
public class RecipeController
{
    private final RecipeService recipeService;
    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/random") //treba da stavim samo gde je shared == true
    public Recipe getRandom()
    {
        return recipeService.getRandomRecipe();
    }

    @GetMapping("/randomfortype/{typeOfFoodId}") //treba da stavim samo gde je shared == true
    public Recipe getRandomForType(@PathVariable UUID typeOfFoodId)
    {
        return recipeService.getRandomRecipeForType(typeOfFoodId);
    }

    @GetMapping("/all") //treba da stavim samo gde je shared == true
    public List<Recipe> getAllRecipes()
    {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/countbyuser/{userId}")
    public long getRecipesCountByUser(@PathVariable UUID userId)
    {
        return recipeService.countRecipesByUser(userId);
    }

}
