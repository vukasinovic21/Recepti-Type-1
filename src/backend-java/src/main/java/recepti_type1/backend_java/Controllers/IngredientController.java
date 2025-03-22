package recepti_type1.backend_java.Controllers;

import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recepti_type1.backend_java.Dtos.NewRole;
import recepti_type1.backend_java.Models.Ingredient;
import recepti_type1.backend_java.Models.User;
import recepti_type1.backend_java.Services.IngredientService;
import recepti_type1.backend_java.Services.TranslationService;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

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

    @Autowired
    private TranslationService translationService;


    @GetMapping("/all")
    public List<Ingredient> getAllIngredients()
    {
        return ingredientService.getAllIngredients();
    }

    @GetMapping("/id/{ingredientId}")
    public Ingredient getIngredientById(@PathVariable UUID ingredientId)
    {
        return ingredientService.getIngredientById(ingredientId);
    }

    @PostMapping("/add") //for admin to add new ingredient
    public Boolean addType(@RequestBody Ingredient newIngredient) throws IOException //we need to make sure that new ingredient is not in the db already
    {
        /*if (ingredientService.existsByName(newIngredient.name))
        {
            return false;
        }*/
        Ingredient i = new Ingredient(newIngredient);

        ingredientService.addIngredient(i);

        //translationService.translateText(newIngredient.getName(), "en"); // translate the name to english and store it in en.json

        return true;
    }

    @PutMapping("/edit") //for admin to edit some ingredient info
    public Boolean editType(@RequestBody Ingredient ingredientUpdate)
    {
        Ingredient i = ingredientService.getIngredientById(ingredientUpdate.getId());

        i.setName(ingredientUpdate.getName());
        i.setCarbs(ingredientUpdate.getCarbs());
        i.setSugar(ingredientUpdate.getSugar());
        i.setFat(ingredientUpdate.getFat());
        i.setProtein(ingredientUpdate.getProtein());
        i.setkCal(ingredientUpdate.getKcal());
        i.setGI(ingredientUpdate.getGi());

        ingredientService.updateIngredient(i);

        return true;
    }

    @PutMapping("/approve") //for admin to approve ingredient
    public Boolean approveIngredient(@RequestBody Ingredient ingredientUpdate)
    {
        Ingredient i = ingredientService.getIngredientById(ingredientUpdate.getId());

        i.setIsApproved(true);

        ingredientService.updateIngredient(i);

        return true;
    }

    @DeleteMapping("/delete") //Delete ingredient
    public Boolean deleteIngredient(@RequestBody NewRole newRole)
    {
        Ingredient i = ingredientService.getIngredientById(newRole.getId());

        if(i == null)
            return false;

        ingredientService.deleteIngredient(i);

        return true;
    }
}