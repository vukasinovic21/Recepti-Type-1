using Back.Domain.Models;
using Back.Domain.ValueObjects;

namespace Back.Application.Recipes.Queries.GetRecipesById
{
    public class GetRecipesNutByIdHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesNutByIdQuery, GetRecipesNutByIdResult>
    {
        public async Task<GetRecipesNutByIdResult> Handle(GetRecipesNutByIdQuery query, CancellationToken cancellationToken)
        {
            //get recipes with nutriotions by Id using dbContext
            //return result

            List<Recipe> recipeNutritions = await dbContext.Recipes
                .Include(r => r.RecipeItems)
                .AsNoTracking()
                .Where(r => r.Id == RecipeId.Of(query.Id))
                .OrderBy(r => r.Id)
                .ToListAsync(cancellationToken);

            decimal Carbs = 0;
            decimal Sugar = 0;
            decimal Fat = 0;
            decimal Protein = 0;
            decimal kCal = 0;
            decimal GL = 0;
            decimal Weight = 0;

            foreach (var recipe in recipeNutritions[0].RecipeItems)
            {
                List<Ingredient> ingredients = new List<Ingredient>( dbContext.Ingredients
                    .Where(i => i.Id == recipe.IngredientId)
                    .OrderBy(i => i.Id));
                
                Carbs += (recipe.Quantity / 100) * ingredients[0].Carbs;
                Sugar += (recipe.Quantity / 100) * ingredients[0].Sugar;
                Fat += (recipe.Quantity / 100) * ingredients[0].Fat;
                Protein += (recipe.Quantity / 100) * ingredients[0].Protein;
                kCal += (recipe.Quantity / 100) * ingredients[0].kCal;
                GL += (((recipe.Quantity / 100) * ingredients[0].Carbs) * ingredients[0].GI) / 100;
                kCal += (recipe.Quantity / 100) * ingredients[0].kCal;
                Weight += recipe.Quantity;
            }

            RecipeNutritionsDto result = new RecipeNutritionsDto(query.Id, recipeNutritions[0].RecipeName, Carbs, Sugar, Fat, Protein, kCal, GL, Weight);

            return new GetRecipesNutByIdResult(result);
        }
    }
}
