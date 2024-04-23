namespace Back.Application.Dtos
{
    public record DietDto(
        Guid Id,
        Guid UserId,
        string DietName,
        Guid NutritionId,
        List<PlanOfDietDto> PlanOfDiets);
}
