using Back.Application.Recipes.Queries.GetRecipesPublic;
using BuildingBlocks.Pagination;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesPublicResponse(PaginatedResult<RecipeDto> Recipes);
    public class GetRecipesPublic : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipesPublic", async ([AsParameters] PaginationRequest request, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesPublicQuery(request));

                var response = result.Adapt<GetRecipesResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipesPublic")
            .Produces<GetRecipesResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes Public")
            .WithDescription("Get Recipes Public"); ;
        }
    }
}
