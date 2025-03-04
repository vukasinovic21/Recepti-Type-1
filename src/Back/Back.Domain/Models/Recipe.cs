﻿using Back.Domain.Abstractions;
using Back.Domain.Events;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class Recipe : Aggregate<RecipeId>
    {
        private readonly List<RecipeItem> _recipeItems = new(); //lista svih sastojaka
        public IReadOnlyList<RecipeItem> RecipeItems => _recipeItems.AsReadOnly();
        public UserId UserId { get; private set; } = default!;
        public string RecipeName { get; private set; } = default!;
        public TypeOfFoodId TypeOfFoodId { get; private set; } = default!;
        public string Instructions { get; private set; } = default!;
        public int TimeToPrepare { get; private set; } = default!;
        public string Picture { get; private set; } = default!;
        public Boolean Shared { get; private set; } = default!;

        public static Recipe Create(RecipeId id, UserId userId, string recipename, TypeOfFoodId typeoffoodid, string instructions, int timetoprepare, string picture, Boolean shared)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(recipename);
            ArgumentException.ThrowIfNullOrWhiteSpace(instructions);
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(timetoprepare);

            var recipe = new Recipe
            {
                Id = id,
                UserId = userId,
                RecipeName = recipename,
                TypeOfFoodId = typeoffoodid,
                Instructions = instructions,
                TimeToPrepare = timetoprepare,
                Picture = picture,
                Shared = shared
            };

            recipe.AddDomainEvent(new RecipeCreatedEvent(recipe));

            return recipe;
        }

        public void Update(string recipename, TypeOfFoodId typeoffoodid, string instructions, int timetoprepare, bool shared)
        {
            RecipeName = recipename;
            TypeOfFoodId = typeoffoodid;
            Instructions = instructions;
            TimeToPrepare = timetoprepare;
            Shared = shared;

            AddDomainEvent(new RecipeUpdatedEvent(this));
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
