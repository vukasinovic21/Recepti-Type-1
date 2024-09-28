using System.Linq;

namespace Back.Application.Extensions
{
    public static class IngredientExtensions
    {
        public static IEnumerable<IngredientDto> ToIngredientDtotoList(this IEnumerable<Ingredient> ingredients)
        {
            return ingredients.Select(ingredient => new IngredientDto(
                    Id: ingredient.Id.Value,
                    Name: ingredient.Name,
                    Carbs: ingredient.Carbs,
                    Sugar: ingredient.Sugar,
                    Fat: ingredient.Fat,
                    Protein: ingredient.Protein,
                    kCal: ingredient.kCal,
                    GI: ingredient.GI));
        }
    }
}
