using Back.Application.Dtos;
using Back.Domain.Models;

namespace Back.Application.Extensions
{
    public static class RecipeExtensions
    {
        public static IEnumerable<RecipeDto> ToRecipeDtotoList(this IEnumerable<Recipe> recipes)
        {
            return recipes.Select(recipe => new RecipeDto(
                    Id: recipe.Id.Value,
                    UserId: recipe.UserId.Value,
                    RecipeName: recipe.RecipeName,
                    TypeOfFoodId: recipe.TypeOfFoodId.Value,
                    Instructions: recipe.Instructions,
                    TimeToPrepare: recipe.TimeToPrepare,
                    Picture: recipe.Picture,
                    Shared: recipe.Shared,
                    RecipeItems: recipe.RecipeItems.Select(ri => new RecipeItemDto(ri.RecipeId.Value, ri.IngredientId.Value, ri.Quantity)).ToList()
                    ));
        }
    }
}
