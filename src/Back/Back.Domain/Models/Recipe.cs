using Back.Domain.Abstractions;
using Back.Domain.Events;
using Back.Domain.ValueObjects;
using System.Xml.Linq;

namespace Back.Domain.Models
{
    public class Recipe : Aggregate<RecipeId>
    {
        private readonly List<RecipeItem> _recipeItems = new(); //lista svih sastojaka
        public IReadOnlyList<RecipeItem> RecipeItems => _recipeItems.AsReadOnly();
        public UserId UserId { get; private set; } = default!;
        public string RecipeName { get; private set; } = default!;
        public int TypeOfFood { get; private set; } = default!;
        public string Instructions { get; private set; } = default!;
        public int TimeToPrepare { get; private set; } = default!;
        public string Picture { get; private set; } = default!;
        /* public decimal TotalCarbs
         {
             get => RecipeItems.Sum(x => x.Carbs);
         }*/
        public static Recipe Create(RecipeId id, UserId userId, string recipename, int typeoffood, string instructions, int timetoprepare, string picture)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(recipename);
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(typeoffood);
            ArgumentException.ThrowIfNullOrWhiteSpace(instructions);
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(timetoprepare);
            ArgumentException.ThrowIfNullOrWhiteSpace(picture);


            var recipe = new Recipe
            {
                Id = id,
                UserId = userId,
                RecipeName = recipename,
                TypeOfFood = typeoffood,
                Instructions = instructions,
                TimeToPrepare = timetoprepare,
                Picture = picture
            };

            recipe.AddDomainEvent(new RecipeCreatedEvent(recipe));

            return recipe;
        }

        public void Update(string recipename, int typeoffood, string instructions, int timetoprepare)
        {
            RecipeName = recipename;
            TypeOfFood = typeoffood;
            Instructions = instructions;
            TimeToPrepare = timetoprepare;

            AddDomainEvent(new RecipeUpdateEvent(this));
        }

        public void Add(IngredientId ingredientId, decimal quantity)
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero (quantity);

            var recipeItem = new RecipeItem(Id, ingredientId, quantity);
            _recipeItems.Add(recipeItem);
        }

        public void Remove(IngredientId ingredientId)
        {
            var recipeItem = _recipeItems.FirstOrDefault(x => x.IngredientId == ingredientId);
            if(recipeItem is not null)
            {
                _recipeItems.Remove(recipeItem);
            }
        }
    }
}
