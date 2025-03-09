package recepti_type1.backend_java.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import recepti_type1.backend_java.Models.Recipe;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, UUID>
{

    @Query(value = "SELECT * FROM \"Recipes\" r", nativeQuery = true)
    List<Recipe> findAllFromTable();

}
