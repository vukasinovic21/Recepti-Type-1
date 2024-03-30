using Back.Application.Recipes.Queries.GetRecipes;
using BuildingBlocks.Pagination;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesResponse(PaginatedResult<RecipeDto> Recipes);
    public class GetRecipes : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes", async ([AsParameters] PaginationRequest request, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesQuery(request));

                var response = result.Adapt<GetRecipesResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipes")
            .Produces<CreateRecipeResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes")
            .WithDescription("Get Recipes"); ;
        }
    }
}
