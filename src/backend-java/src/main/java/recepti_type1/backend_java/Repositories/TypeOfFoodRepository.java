package recepti_type1.backend_java.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Models.TypeOfFood;

import java.util.UUID;

@Repository
public interface TypeOfFoodRepository extends JpaRepository<TypeOfFood, UUID>
{

}
