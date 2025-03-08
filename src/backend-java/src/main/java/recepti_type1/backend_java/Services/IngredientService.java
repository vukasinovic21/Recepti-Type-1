package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.Ingredient;
import recepti_type1.backend_java.Repositories.IngredientRepository;

import java.util.List;

@Service
public class IngredientService
{

    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository)
    {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> getAllIngredients()
    {
        return ingredientRepository.findAll();
    }

    public void addIngredient(Ingredient i)
    {
        ingredientRepository.save(i);
    }
}
