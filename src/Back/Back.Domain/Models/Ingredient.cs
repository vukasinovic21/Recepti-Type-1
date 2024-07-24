using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class Ingredient : Entity<IngredientId>
    {
        public string Name { get; private set; } = default!;
        public decimal Carbs { get; private set; } = default!;
        public decimal Sugar { get; private set; } = default!;
        public decimal Fat { get; private set; } = default!;
        public decimal Protein { get; private set; } = default!;
        public decimal kCal { get; private set; } = default!;
        public decimal GI { get; private set; } = default!; //GlygemicIndex

        public static Ingredient Create(IngredientId id, string name, decimal carbs, decimal sugar, decimal fat, decimal protein, decimal kcal, decimal gi)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            ArgumentOutOfRangeException.ThrowIfNegative(carbs);
            ArgumentOutOfRangeException.ThrowIfNegative(sugar);
            ArgumentOutOfRangeException.ThrowIfNegative(fat);
            ArgumentOutOfRangeException.ThrowIfNegative(protein);
            ArgumentOutOfRangeException.ThrowIfNegative(kcal);
            ArgumentOutOfRangeException.ThrowIfNegative(gi);

            var ingredient = new Ingredient
            {
                Id = id,
                Name = name,
                Carbs = carbs,
                Sugar = sugar,
                Fat = fat,
                Protein = protein,
                kCal = kcal,
                GI = gi
            };

            return ingredient;
        }
    }
}
