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
                    PlanOfDiets: diet.PlanOfDiets.Select(pod => new PlanOfDietDto(pod.DietId.Value, pod.RecipeId.Value, pod.TypeOfMealId.Value, pod.DayOfWeek)).ToList()
                    ));
        }
    }
}
