package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.Ingredient;
import recepti_type1.backend_java.Repositories.IngredientRepository;

import java.util.List;
import java.util.UUID;

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

    public Ingredient getIngredientById(UUID id)
    {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingredient not found for ID: " + id));
    }

    public void addIngredient(Ingredient i)
    {
        ingredientRepository.save(i);
    }

    public void updateIngredient(Ingredient i)
    {
        ingredientRepository.save(i);
    }

    public void deleteIngredient(Ingredient i)
    {
        ingredientRepository.delete(i);
    }

}
