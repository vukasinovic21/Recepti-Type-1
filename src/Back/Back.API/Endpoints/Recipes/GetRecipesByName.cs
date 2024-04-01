using Back.Application.Recipes.Queries.GetRecipesByName;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesByNameResponse(IEnumerable<RecipeDto> Recipes);
    public class GetRecipesByName : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/{recipeName}", async (string recipeName, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesByNameQuery(recipeName));

                var response = result.Adapt<GetRecipesByNameResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipesByName")
            .Produces<GetRecipesByNameResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes By Name")
            .WithDescription("Get Recipes By Name"); ;
        }
    }
}
