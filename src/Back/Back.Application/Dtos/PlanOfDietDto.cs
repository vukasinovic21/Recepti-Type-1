namespace Back.Application.Dtos
{
    public record PlanOfDietDto(Guid DietId, Guid RecipeId, Guid TypeOfMealId, DayOfWeek DayOfWeek);
}
