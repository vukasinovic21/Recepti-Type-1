package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Services.RecipeService;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController
{
    private final RecipeService recipeService;
    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/random")
    public String getRandom()
    {
        return "Get random recipes from chosen category.";
    }

    @GetMapping("/all")
    public List<Recipe> getAllRecipes()
    {
        return recipeService.getAllRecipes();
    }
}
