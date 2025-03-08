package recepti_type1.backend_java.Controllers;

import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recepti_type1.backend_java.Models.Ingredient;
import recepti_type1.backend_java.Services.IngredientService;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController
{

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService)
    {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/all")
    public List<Ingredient> getAllIngredients()
    {
        return ingredientService.getAllIngredients();
    }

    @PostMapping("/add") //for admin to add new ingredient
    public Boolean addType(@RequestBody Ingredient newIngredient) //we need to make sure that new ingredient is not in the db already
    {
        /*if (ingredientService.existsByName(newIngredient.name))
        {
            return false;
        }*/
        Ingredient i = new Ingredient(newIngredient);

        System.out.println(i.getName());
        ingredientService.addIngredient(i);

        return true;
    }
}
