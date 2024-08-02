
namespace Back.Application.Dtos
{
    public record DietInfoDto(
        Guid Id,
        Guid UserId,
        string DietName,
        Guid NutritionId,
        DateTime CreatedAt,
        List<PlanOfDietInfoDto> PlanOfDiets);
}
