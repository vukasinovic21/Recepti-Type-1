
using Back.Domain.Models;
using Back.Domain.ValueObjects;

namespace Back.Application.Recipes.Queries.GetRecipesIngredientsById
{
    public class GetRecipesIngredientsByIdHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetRecipesIngredientsByIdQuery, GetRecipesIngredientsByIdResult>
    {
        public async Task<GetRecipesIngredientsByIdResult> Handle(GetRecipesIngredientsByIdQuery query, CancellationToken cancellationToken)
        {
            //get ingredients from recipe by Id using dbContext
            //return result

            List<RecipeItem> recipeIngredients = await dbContext.RecipeItems
                .AsNoTracking()
                .Where(ri => ri.RecipeId == RecipeId.Of(query.Id))
                .OrderBy(ri => ri.Id)
                .ToListAsync(cancellationToken);

            List<RecipeIngredientsDto> lista = [];
            
            foreach (var ingredient in recipeIngredients)
            {
                List<Ingredient> ingredients = new List<Ingredient>(dbContext.Ingredients
                   .Where(i => i.Id == ingredient.IngredientId));
                   
                lista.Add(new RecipeIngredientsDto(ingredient.RecipeId.Value, ingredient.IngredientId.Value, ingredients[0].Name, ingredient.Quantity));
            }

            return new GetRecipesIngredientsByIdResult(lista);
        }
    }
}