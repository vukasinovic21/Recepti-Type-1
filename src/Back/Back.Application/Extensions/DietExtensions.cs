using Back.Domain.Models;

namespace Back.Application.Extensions
{
    public static class DietExtensions
    {
        public static IEnumerable<DietDto> ToDietDtotoList(this IEnumerable<Diet> diets)
        {

            return diets.Select(diet => new DietDto(
                    Id: diet.Id.Value,
                    UserId: diet.UserId.Value,
                    DietName: diet.DietName,
                    NutritionId: diet.NutritionId.Value,
                    CreatedAt: diet.CreatedAt.Value,
                    PlanOfDiets: diet.PlanOfDiets
                      .Select(pod => new PlanOfDietDto(pod.DietId.Value, pod.RecipeId.Value, pod.TypeOfMealId.Value, pod.DayOfWeek, pod.Quantity))
                      .OrderBy(dto => dto.DayOfWeek)         // First sort by DayOfWeek
                      .ThenBy(dto => dto.TypeOfMealId)       // Then sort by TypeOfMealId
                      .ToList()
                    ));
        }
        public static IEnumerable<DietInfoDto> ToDietInfoDtotoList(this IEnumerable<Diet> diets)
        {

            return diets.Select(diet => new DietInfoDto(
                    Id: diet.Id.Value,
                    UserId: diet.UserId.Value,
                    DietName: diet.DietName,
                    NutritionId: diet.NutritionId.Value,
                    CreatedAt: diet.CreatedAt.Value,
                    PlanOfDiets: diet.PlanOfDiets
                      .Select(pod => new PlanOfDietInfoDto(pod.DietId.Value, pod.RecipeId.Value, pod.TypeOfMealId.Value, pod.DayOfWeek, pod.Quantity, "pod.RecipeName", "pod.Picture"))
                      .OrderBy(dto => dto.DayOfWeek)         
                      .ToList()
                    ));
        }
    }
}
