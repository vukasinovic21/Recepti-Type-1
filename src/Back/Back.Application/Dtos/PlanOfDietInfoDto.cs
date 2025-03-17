namespace Back.Application.Dtos
{
    public record PlanOfDietInfoDto(
        Guid DietId,
        Guid RecipeId,
        Guid TypeOfMealId,
        DayOfWeek DayOfWeek,
        decimal Quantity,
        string RecipeName,
        string Picture);
}
