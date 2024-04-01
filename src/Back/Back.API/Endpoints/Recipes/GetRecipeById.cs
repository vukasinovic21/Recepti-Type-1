using Back.Application.Recipes.Queries.GetRecipesById;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesByIdResponse(RecipeNutritionsDto Recipes);
    public class GetRecipesById : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/id/{Id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesByIdQuery(Id));

                return Results.Ok(result);
            })
            .WithName("GetRecipeById")
            .Produces<GetRecipesByIdResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes By Id with nutritions")
            .WithDescription("Get Recipes By Id with nutritions"); ;
        }
    }
}
