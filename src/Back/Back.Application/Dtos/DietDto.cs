﻿namespace Back.Application.Dtos
{
    public record DietDto(
        Guid Id,
        Guid UserId,
        string DietName,
        Guid NutritionId, 
        DateTime CreatedAt,
        List<PlanOfDietDto> PlanOfDiets);
}
