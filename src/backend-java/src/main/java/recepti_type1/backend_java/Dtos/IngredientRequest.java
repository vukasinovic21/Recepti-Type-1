package recepti_type1.backend_java.Dtos;

import java.util.List;
import java.util.UUID;

public class IngredientRequest
{
    private List<UUID> ingredientIds;

    public List<UUID> getIngredientIds()
    {
        return ingredientIds;
    }

    public void setIngredientIds(List<UUID> ingredientIds)
    {
        this.ingredientIds = ingredientIds;
    }
}
