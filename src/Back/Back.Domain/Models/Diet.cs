using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class Diet : Entity<DietId>
    {
        private readonly List<PlanOfDiet> _planOFDiets = new(); //lista svih obroka
        public IReadOnlyList<PlanOfDiet> PlanOfDiets => _planOFDiets.AsReadOnly();
        public UserId UserId { get; private set; } = default!;
        public string DietName { get; private set; } = default!;
        public UserId NutritionId { get; private set; } = default!;

        public static Diet Create(DietId id, UserId userId, string dietname, UserId nutriotionId)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(dietname);

            var diet = new Diet
            {
                Id = id,
                UserId = userId,
                DietName = dietname,
                NutritionId = null, //dok se ne stavi da moze nutricionista da zadaje planove ishrane
            };

            return diet;
        }

        public void Update(string dietname)
        {
            DietName = dietname;
        }

        public void Add(RecipeId recipeId, TypeOfMealId typeOfMealId, DayOfWeek dayOfWeek)
        {
            var planOfDiet = new PlanOfDiet(Id, recipeId, typeOfMealId, dayOfWeek);
            _planOFDiets.Add(planOfDiet);
        }
        
        public void Remove(RecipeId recipeId)
        {
            var planOfDiet = _planOFDiets.FirstOrDefault(x => x.RecipeId == recipeId);
            if (planOfDiet is not null)
            {
                _planOFDiets.Remove(planOfDiet);
            }
        }
    }
}
