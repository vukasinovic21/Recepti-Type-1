namespace Back.Application.Dtos
{
    public record RecipeNutritionsDto(
        Guid Id,
        string RecipeName,
        decimal Carbs, //for the entire recipe
        decimal Sugar, //for the entire recipe
        decimal Fat, //for the entire recipe
        decimal Protein, //for the entire recipe
        decimal kCal, //for the entire recipe
        decimal GL, //for the entire recipe
        decimal Weight); //for the entire recipe
}