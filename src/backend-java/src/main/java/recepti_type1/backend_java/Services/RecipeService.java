package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Repositories.RecipeRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeService
{
    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository)
    {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes()
    {
        return recipeRepository.findAll();
        //return recipeRepository.findAllFromTable();
    }

    public Recipe getRandomRecipe()
    {
        return recipeRepository.findRandomRecipe();
    }

    public Recipe getRandomRecipeForType(UUID TypeOfFoodId)
    {
        return recipeRepository.findRandomRecipeForCategory(TypeOfFoodId);
    }

    public long getAllRecipesNumber()
    {
        return recipeRepository.count();
    }

    public long countRecipesByUser(UUID UserId)
    {
        return recipeRepository.countByUserId(UserId);
    }

}
