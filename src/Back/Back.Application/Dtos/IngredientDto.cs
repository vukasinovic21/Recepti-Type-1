
namespace Back.Application.Dtos
{
    public record IngredientDto(
        Guid Id, 
        string Name,
        decimal Carbs,
        decimal Sugar,
        decimal Fat,
        decimal Protein,
        decimal kCal,
        decimal GI);
}