using Back.Application.Recipes.Queries.GetRecipesByUserPublic;

namespace Back.API.Endpoints.Recipes
{

    public record GetRecipesByUserPublicResponse(IEnumerable<RecipeDto> Recipes);
    public class GetRecipesByUserPublic : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/user/public/{userId}", async (Guid userId, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesByUserPublicQuery(userId));

                var response = result.Adapt<GetRecipesByUserPublicResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipesByUserPublic")
            .Produces<GetRecipesByUserPublicResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes Public By User")
            .WithDescription("Get Recipes Public By User"); ;
        }
    }
}
