package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Models.RecipeItem;
import recepti_type1.backend_java.Repositories.RecipeItemRepository;
import recepti_type1.backend_java.Repositories.RecipeRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RecipeService
{
    private final RecipeRepository recipeRepository;
    private final RecipeItemRepository recipeItemRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, RecipeItemRepository  recipeItemRepository)
    {
        this.recipeRepository = recipeRepository;
        this.recipeItemRepository = recipeItemRepository;
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

    public List<Recipe> getAllRecipesByIngredients(List<UUID> ingredientIds)
    {
        List<RecipeItem> recipeItems = recipeItemRepository.findByIngredientIdsIn(ingredientIds);

        Set<UUID> recipeIds = recipeItems.stream()
                .map(RecipeItem::getRecipeId)
                .collect(Collectors.toSet());

        return recipeRepository.findAllByIdInAndSharedTrue(recipeIds);
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
