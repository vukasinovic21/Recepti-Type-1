package recepti_type1.backend_java.Dtos;

import java.util.List;
import java.util.UUID;

public class IngredientRequest
{
    private List<UUID> ingredientIds;
    private List<UUID> ingredientIdsDontHave;

    public List<UUID> getIngredientIds()
    {
        return ingredientIds;
    }

    public void setIngredientIds(List<UUID> ingredientIds)
    {
        this.ingredientIds = ingredientIds;
    }

    public List<UUID> getIngredientIdsDontHave() {
        return ingredientIdsDontHave;
    }

    public void setIngredientIdsDontHave(List<UUID> ingredientIdsDontHave) {
        this.ingredientIdsDontHave = ingredientIdsDontHave;
    }
}
