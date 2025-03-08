package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recepti_type1.backend_java.Dtos.AddQuestionAndType;
import recepti_type1.backend_java.Models.Question;
import recepti_type1.backend_java.Models.TypeOfFood;
import recepti_type1.backend_java.Services.TypeOfFoodService;

import java.util.List;

@RestController
@RequestMapping("/typeoffood")
public class TypeOfFoodController
{
    private final TypeOfFoodService typeOfFoodService ;

    @Autowired
    public TypeOfFoodController(TypeOfFoodService typeOfFoodService)
    {
        this.typeOfFoodService = typeOfFoodService;
    }

    @GetMapping("/all")
    public List<TypeOfFood> getAllTypes()
    {
        return typeOfFoodService.getAllTypes();
    }

    @PostMapping("/add") //for admin to add new type of food
    public Boolean addType(@RequestBody AddQuestionAndType newType) //we need to make sure that new type of food is not in the db already
    {
        /*if (typeOfFoodService.existsByName(name))
        {
            return false;
        }*/
        TypeOfFood tof = new TypeOfFood();
        tof.setTypeName(newType.getName());

        System.out.println(tof.getTypeName());
        typeOfFoodService.addType(tof);

        return true;
    }
}

