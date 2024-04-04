using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class PlanOfDiet : Entity<PlanOfDietId>
    {
        public PlanOfDiet() { }
        public PlanOfDiet(DietId dietId, RecipeId recipeId, TypeOfMealId typeOfMeal, DayOfWeek dayOfWeek)
        {
            Id = PlanOfDietId.Of(Guid.NewGuid());
            DietId = dietId;
            RecipeId = recipeId;
            TypeOfMealId = typeOfMeal;
            DayOfWeek = dayOfWeek;
        }

        public DietId DietId { get; private set; } = default!;
        public RecipeId RecipeId { get; private set; } = default!;
        public TypeOfMealId TypeOfMealId { get; private set; } = default!;
        public DayOfWeek DayOfWeek { get; private set; } = default!;
    }
}
