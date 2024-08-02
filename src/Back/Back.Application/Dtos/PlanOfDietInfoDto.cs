namespace Back.Application.Dtos
{
    public record PlanOfDietInfoDto(
        Guid DietId,
        Guid RecipeId,
        Guid TypeOfMealId,
        DayOfWeek DayOfWeek,
        string RecipeName,
        string Picture);
}
