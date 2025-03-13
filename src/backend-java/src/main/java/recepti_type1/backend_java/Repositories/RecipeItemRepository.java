package recepti_type1.backend_java.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Models.RecipeItem;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeItemRepository extends JpaRepository<RecipeItem, UUID>
{
    @Query("SELECT ri FROM RecipeItem ri WHERE ri.IngredientId IN :ingredientIds")
    List<RecipeItem> findByIngredientIdsIn(@Param("ingredientIds") List<UUID> ingredientIds);

    /*@Query(value = "SELECT * FROM \"RecipeItem\" ri WHERE ri.\"IngredientId\" IN :ingredientIds", nativeQuery = true)
    List<RecipeItem> findByIngredientIdsIn(@Param("ingredientIds") List<UUID> ingredientIds);*/
}
