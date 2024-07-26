using Back.Application.Recipes.Queries.GetRecipesById;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesNutByIdResponse(RecipeNutritionsDto Recipes);
    public class GetRecipesNutById : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/id/nut{Id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesNutByIdQuery(Id));

                return Results.Ok(result);
            })
            .WithName("GetRecipeNutById")
            .Produces<GetRecipesNutByIdResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes By Id with nutritions")
            .WithDescription("Get Recipes By Id with nutritions"); ;
        }
    }
}
