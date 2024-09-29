
using Back.Application.Recipes.Queries.GetRecipesLiked;

namespace Back.API.Endpoints.Recipes
{

    public record GetRecipesLikedResponse(IEnumerable<RecipeDto> Recipes);
    public class GetRecipesLiked : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/user/liked/{userId}", async (Guid userId, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesLikedQuery(userId));

                var response = result.Adapt<GetRecipesLikedResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipesLiked")
            .Produces<GetRecipesLikedResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("GetRecipesLiked By User")
            .WithDescription("GetRecipesLiked By User"); ;
        }
    }
}
