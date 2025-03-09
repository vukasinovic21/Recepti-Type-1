package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.TypeOfFood;
import recepti_type1.backend_java.Repositories.TypeOfFoodRepository;

import java.util.List;

@Service
public class TypeOfFoodService
{
    private final TypeOfFoodRepository typeOfFoodRepository;

    @Autowired
    public TypeOfFoodService(TypeOfFoodRepository typeOfFoodRepository)
    {
        this.typeOfFoodRepository = typeOfFoodRepository;
    }

    public List<TypeOfFood> getAllTypes()
    {
        return typeOfFoodRepository.findAll();
    }

    public void addType(TypeOfFood tof)
    {
        typeOfFoodRepository.save(tof);
    }

    public long getAllTypesNumber()
    {
        return typeOfFoodRepository.count();
    }

}
