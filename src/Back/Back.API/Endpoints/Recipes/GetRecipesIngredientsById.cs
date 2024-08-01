using Back.Application.Recipes.Queries.GetRecipesIngredientsById;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesIngredientsByIdResponse(RecipeIngredientsDto Ingredients);
    public class GetRecipesIngredientsById : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/id/ingredients/{Id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesIngredientsByIdQuery(Id));

                return Results.Ok(result);
            })
            .WithName("GetRecipeIngredientsById")
            .Produces<GetRecipesIngredientsByIdResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes Ingredients By Id")
            .WithDescription("Get Recipes Ingredients By Id"); ;
        }
    }
}
